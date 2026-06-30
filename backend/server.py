from fastapi import FastAPI, APIRouter, HTTPException, Depends, UploadFile, File, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import io
import json
import logging
import uuid
import re
import bcrypt
import jwt
import pdfplumber
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Literal
from datetime import datetime, timezone, timedelta
from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')
JWT_SECRET = os.environ['JWT_SECRET']
JWT_ALG = os.environ.get('JWT_ALGORITHM', 'HS256')
JWT_HOURS = int(os.environ.get('JWT_EXPIRES_HOURS', '168'))

app = FastAPI(title="Credit Vivo API")
api_router = APIRouter(prefix="/api")
bearer = HTTPBearer(auto_error=False)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger("credit-vivo")


# ----------------- Models -----------------
class RegisterIn(BaseModel):
    name: str
    email: EmailStr
    password: str

class LoginIn(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: str
    name: str
    email: EmailStr
    created_at: str

class AuthOut(BaseModel):
    token: str
    user: UserOut

class DisputeItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    creditor: str
    account_type: str
    issue_category: Literal["inaccurate", "outdated", "unverifiable", "duplicate", "unfair", "identity"]
    severity: Literal["high", "medium", "low"]
    summary: str
    recommended_action: str
    bureau: List[str]  # e.g. ["Experian", "Equifax", "TransUnion"]
    impact_estimate: str  # natural language
    status: Literal["recommended", "in_review", "submitted", "resolved", "dismissed"] = "recommended"

class CreditAnalysis(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    filename: str
    estimated_score_range: str
    summary: str
    positive_factors: List[str]
    risk_factors: List[str]
    disputes: List[DisputeItem]
    items_total: int
    items_disputable: int
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


# ----------------- Auth helpers -----------------
def hash_password(p: str) -> str:
    return bcrypt.hashpw(p.encode(), bcrypt.gensalt()).decode()

def verify_password(p: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(p.encode(), hashed.encode())
    except Exception:
        return False

def make_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "iat": datetime.now(timezone.utc),
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_HOURS),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)

async def get_current_user(creds: Optional[HTTPAuthorizationCredentials] = Depends(bearer)):
    if not creds:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(creds.credentials, JWT_SECRET, algorithms=[JWT_ALG])
        user_id = payload.get("sub")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await db.users.find_one({"id": user_id}, {"_id": 0, "password": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


# ----------------- Routes -----------------
@api_router.get("/")
async def root():
    return {"service": "Credit Vivo API", "status": "ok"}

@api_router.post("/auth/register", response_model=AuthOut)
async def register(body: RegisterIn):
    email = body.email.lower().strip()
    if await db.users.find_one({"email": email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    user_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc).isoformat()
    doc = {
        "id": user_id,
        "name": body.name.strip(),
        "email": email,
        "password": hash_password(body.password),
        "created_at": now,
        "role": "user",
    }
    await db.users.insert_one(doc)
    token = make_token(user_id)
    return AuthOut(token=token, user=UserOut(id=user_id, name=doc["name"], email=email, created_at=now))

@api_router.post("/auth/login", response_model=AuthOut)
async def login(body: LoginIn):
    email = body.email.lower().strip()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(body.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = make_token(user["id"])
    return AuthOut(
        token=token,
        user=UserOut(id=user["id"], name=user["name"], email=user["email"], created_at=user["created_at"]),
    )

@api_router.get("/auth/me", response_model=UserOut)
async def me(user=Depends(get_current_user)):
    return UserOut(id=user["id"], name=user["name"], email=user["email"], created_at=user["created_at"])


# ----------------- Credit Report Upload + AI Analysis -----------------
def _extract_pdf_text(content: bytes) -> str:
    text_parts = []
    with pdfplumber.open(io.BytesIO(content)) as pdf:
        for page in pdf.pages[:20]:  # cap at 20 pages
            t = page.extract_text() or ""
            text_parts.append(t)
    return "\n".join(text_parts).strip()


SYSTEM_PROMPT = """You are an expert U.S. consumer credit report analyst for Credit Vivo.
Analyze the provided credit report text. Identify items that may be **inaccurate, outdated (beyond 7-year reporting limits), unverifiable, duplicate, or unfair** under the FCRA.
You DO NOT guarantee score changes. Always frame recommendations as helping the user dispute potentially questionable items.

Return STRICT JSON only (no markdown, no commentary) with this exact schema:
{
  "estimated_score_range": "string like '580-620' or 'unable to determine'",
  "summary": "2-3 sentence neutral overview",
  "positive_factors": ["string", ...],
  "risk_factors": ["string", ...],
  "items_total": integer,
  "items_disputable": integer,
  "disputes": [
    {
      "creditor": "string",
      "account_type": "string e.g. Credit Card, Collection, Student Loan",
      "issue_category": "inaccurate|outdated|unverifiable|duplicate|unfair|identity",
      "severity": "high|medium|low",
      "summary": "1-2 sentence description of the issue",
      "recommended_action": "specific dispute action",
      "bureau": ["Experian"|"Equifax"|"TransUnion", ...],
      "impact_estimate": "qualitative phrase like 'moderate score lift potential'"
    }
  ]
}

If the document does not look like a credit report, return the schema with empty disputes and explain in summary."""


async def _analyze_with_claude(text: str) -> dict:
    text = text[:25000]  # safety cap
    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=f"credit-analysis-{uuid.uuid4()}",
        system_message=SYSTEM_PROMPT,
    ).with_model("anthropic", "claude-sonnet-4-5-20250929")
    user_msg = UserMessage(text=f"Analyze this credit report:\n\n{text}\n\nReturn JSON only.")
    try:
        response = await chat.send_message(user_msg)
    except Exception as e:
        err = str(e)
        logger.error(f"LLM call failed: {err}")
        if "Budget has been exceeded" in err or "budget_exceeded" in err:
            raise HTTPException(
                status_code=402,
                detail="AI analysis budget exhausted. Please add balance to your Universal Key in Profile → Universal Key, then try again.",
            )
        raise HTTPException(status_code=502, detail="AI service is temporarily unavailable. Please try again.")
    # response is a string; extract JSON
    raw = response if isinstance(response, str) else str(response)
    m = re.search(r"\{[\s\S]*\}", raw)
    if not m:
        raise HTTPException(status_code=500, detail="AI analysis returned invalid format")
    try:
        return json.loads(m.group(0))
    except json.JSONDecodeError as e:
        logger.error(f"JSON parse error: {e}; raw: {raw[:500]}")
        raise HTTPException(status_code=500, detail="AI analysis JSON parse error")


@api_router.post("/credit-reports/upload", response_model=CreditAnalysis)
async def upload_credit_report(file: UploadFile = File(...), user=Depends(get_current_user)):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    content = await file.read()
    if len(content) > 15 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large (max 15MB)")
    try:
        text = _extract_pdf_text(content)
    except Exception as e:
        logger.error(f"PDF extraction failed: {e}")
        raise HTTPException(status_code=400, detail="Could not read PDF content")
    if len(text) < 100:
        raise HTTPException(status_code=400, detail="PDF appears to contain no readable text")

    ai_data = await _analyze_with_claude(text)

    disputes = [DisputeItem(**d) for d in ai_data.get("disputes", [])]
    analysis = CreditAnalysis(
        user_id=user["id"],
        filename=file.filename,
        estimated_score_range=ai_data.get("estimated_score_range", "unable to determine"),
        summary=ai_data.get("summary", ""),
        positive_factors=ai_data.get("positive_factors", []),
        risk_factors=ai_data.get("risk_factors", []),
        disputes=disputes,
        items_total=int(ai_data.get("items_total", 0)),
        items_disputable=int(ai_data.get("items_disputable", len(disputes))),
    )
    doc = analysis.model_dump()
    await db.credit_analyses.insert_one(doc)
    return analysis


@api_router.get("/credit-reports", response_model=List[CreditAnalysis])
async def list_reports(user=Depends(get_current_user)):
    docs = await db.credit_analyses.find({"user_id": user["id"]}, {"_id": 0}).sort("created_at", -1).to_list(50)
    return [CreditAnalysis(**d) for d in docs]


@api_router.get("/credit-reports/latest", response_model=Optional[CreditAnalysis])
async def latest_report(user=Depends(get_current_user)):
    doc = await db.credit_analyses.find_one({"user_id": user["id"]}, {"_id": 0}, sort=[("created_at", -1)])
    if not doc:
        return None
    return CreditAnalysis(**doc)


class DisputeStatusUpdate(BaseModel):
    status: Literal["recommended", "in_review", "submitted", "resolved", "dismissed"]


@api_router.patch("/credit-reports/{analysis_id}/disputes/{dispute_id}")
async def update_dispute_status(analysis_id: str, dispute_id: str, body: DisputeStatusUpdate, user=Depends(get_current_user)):
    res = await db.credit_analyses.update_one(
        {"id": analysis_id, "user_id": user["id"], "disputes.id": dispute_id},
        {"$set": {"disputes.$.status": body.status}},
    )
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Dispute not found")
    return {"ok": True, "status": body.status}


# ----------------- App wiring -----------------
from phase2 import register_all
register_all(api_router, db, get_current_user)

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
