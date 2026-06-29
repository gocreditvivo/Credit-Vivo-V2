from __future__ import annotations

"""
Credit Vivo Proprietary Scanner API v16

No paid AI API.
No Anthropic / Claude.
No competitor code.
No automatic disputes.

Uses:
- pypdf for PDF text extraction
- Credit Vivo Proprietary Parser Engine for parsing/review
"""

import json
import os
import shutil
import uuid
from pathlib import Path
from typing import Dict, List

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

try:
    from pypdf import PdfReader
except Exception:
    PdfReader = None

try:
    from .credit_vivo_proprietary_engine import (
        detect_bureau,
        parse_reports,
        result_to_dict,
        write_outputs,
    )
except ImportError:
    from credit_vivo_proprietary_engine import (
        detect_bureau,
        parse_reports,
        result_to_dict,
        write_outputs,
    )

ROOT = Path(__file__).resolve().parent
STORAGE_ROOT = Path(os.getenv("SCANNER_STORAGE_DIR", "/tmp/creditvivo-scanner" if os.getenv("VERCEL") else str(ROOT)))
UPLOADS = STORAGE_ROOT / "uploads"
OUTPUT = STORAGE_ROOT / "output"
UPLOADS.mkdir(exist_ok=True)
OUTPUT.mkdir(exist_ok=True)


def env_int(name: str, default: int) -> int:
    try:
        return int(os.getenv(name, str(default)))
    except ValueError:
        return default


MAX_FILES = env_int("SCANNER_MAX_FILES", 3)
MAX_FILE_MB = env_int("SCANNER_MAX_FILE_MB", 25)
MAX_FILE_BYTES = MAX_FILE_MB * 1024 * 1024
RETAIN_UPLOADS = os.getenv("SCANNER_RETAIN_UPLOADS", "false").lower() == "true"
WRITE_RAW_TEXT = os.getenv("SCANNER_WRITE_RAW_TEXT", "false").lower() == "true"
ALLOWED_PDF_TYPES = {"application/pdf", "application/x-pdf", "application/octet-stream", "binary/octet-stream"}

app = FastAPI(title="Credit Vivo Proprietary Scanner API", version="16.0")

allowed_origins = os.getenv(
    "CREDIT_VIVO_ALLOWED_ORIGINS",
    "http://localhost:5173,http://127.0.0.1:5173"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in allowed_origins if o.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def extract_pdf_text(path: Path) -> tuple[str, int]:
    if PdfReader is None:
        raise RuntimeError("pypdf is not installed. Run: pip install -r requirements.txt")

    reader = PdfReader(str(path))
    parts = []
    for page_num, page in enumerate(reader.pages, start=1):
        try:
            text = page.extract_text() or ""
        except Exception as exc:
            text = f"[Page {page_num} text extraction error: {exc}]"
        parts.append(f"\n\n--- PAGE {page_num} ---\n{text}")

    return "\n".join(parts), len(reader.pages)


@app.get("/health")
def health():
    return {
        "ok": True,
        "service": "credit-vivo-proprietary-scanner-api",
        "version": "16.0",
        "paid_ai_used": False,
        "anthropic_required": False,
        "pymupdf_required": False,
        "parser_engine": "Credit Vivo Proprietary Parser Engine",
        "pdf_text_engine": "pypdf",
        "max_files": MAX_FILES,
        "max_file_mb": MAX_FILE_MB,
        "retain_uploads": RETAIN_UPLOADS,
        "write_raw_text": WRITE_RAW_TEXT,
    }


async def save_pdf_upload(file: UploadFile, dest: Path) -> int:
    safe_type = (file.content_type or "").lower()
    if safe_type and safe_type not in ALLOWED_PDF_TYPES:
        raise HTTPException(status_code=400, detail=f"{file.filename} is not a PDF upload.")

    if dest.suffix.lower() != ".pdf":
        raise HTTPException(status_code=400, detail=f"{file.filename} must be a PDF file.")

    total = 0
    try:
        with dest.open("wb") as f:
            while True:
                chunk = await file.read(1024 * 1024)
                if not chunk:
                    break
                total += len(chunk)
                if total > MAX_FILE_BYTES:
                    raise HTTPException(
                        status_code=413,
                        detail=f"{file.filename} is larger than the {MAX_FILE_MB} MB beta upload limit.",
                    )
                f.write(chunk)
    finally:
        await file.close()

    if total == 0:
        raise HTTPException(status_code=400, detail=f"{file.filename} is empty.")

    return total


@app.post("/api/scanner/parse")
async def parse_uploaded_reports(
    files: List[UploadFile] = File(...),
    use_ai_second_pass: bool = Form(default=False),
):
    """
    Accept one or more PDF credit reports.

    `use_ai_second_pass` is accepted for backwards compatibility but ignored.
    v16 uses Credit Vivo Proprietary Parser Engine only.
    """
    if len(files) > MAX_FILES:
        raise HTTPException(
            status_code=400,
            detail=f"Beta upload is limited to {MAX_FILES} PDF files at a time.",
        )

    job_id = f"scan_{uuid.uuid4().hex[:12]}"
    job_dir = UPLOADS / job_id
    out_dir = OUTPUT / job_id
    job_dir.mkdir(parents=True, exist_ok=True)
    out_dir.mkdir(parents=True, exist_ok=True)

    report_texts: Dict[str, dict] = {}
    saved_files = []

    for index, file in enumerate(files, start=1):
        safe_name = Path(file.filename or f"report_{index}.pdf").name
        dest = job_dir / safe_name

        await save_pdf_upload(file, dest)

        try:
            text, pages = extract_pdf_text(dest)
            bureau = detect_bureau(safe_name, text)
            report_texts[safe_name] = {"text": text, "bureau": bureau}
            if WRITE_RAW_TEXT:
                (out_dir / f"{safe_name}_raw_text.txt").write_text(text, encoding="utf-8", errors="ignore")
            saved_files.append({
                "filename": safe_name,
                "bureau": bureau,
                "pages": pages,
                "chars": len(text),
                "status": "extracted"
            })
        except Exception as exc:
            saved_files.append({
                "filename": safe_name,
                "bureau": f"Report {index}",
                "pages": 0,
                "chars": 0,
                "status": "error",
                "error": str(exc)
            })

    parsed = parse_reports(report_texts)
    write_outputs(parsed, out_dir)
    data = result_to_dict(parsed)

    result = {
        "job_id": job_id,
        "files": saved_files,
        "ai_second_pass": False,
        "paid_ai_used": False,
        "status": {
            "mode": "credit_vivo_proprietary_engine_v16",
            "message": "Parsed using Credit Vivo proprietary rule engine. No paid AI API used."
        },
        "review_items_count": len(data["tradelines"]),
        "review_items_preview": data["tradelines"][:25],
        "issues_count": len(data["issues"]),
        "issues_preview": data["issues"][:25],
        "cross_bureau_groups": data["cross_bureau_groups"],
        "customer_message": data["customer_summary"]["message"],
        "customer_summary": data["customer_summary"],
        "admin_summary": data["admin_summary"],
        "letter_workflow": data.get("letter_workflow"),
        "recommended_letter_queue": data.get("recommended_letter_queue", []),
        "fcra_review": data.get("fcra_review", []),
        "output_folder": str(out_dir),
    }


@app.get("/api/health")
def api_health():
    return health()

    (out_dir / "scan_result_summary.json").write_text(json.dumps(result, indent=2), encoding="utf-8")

    if not RETAIN_UPLOADS:
        shutil.rmtree(job_dir, ignore_errors=True)

    return JSONResponse(result)


@app.get("/api/scanner/result/{job_id}")
def get_result(job_id: str):
    summary = OUTPUT / job_id / "scan_result_summary.json"
    if not summary.exists():
        return JSONResponse({"ok": False, "error": "Result not found"}, status_code=404)
    return JSONResponse(json.loads(summary.read_text(encoding="utf-8")))


@app.get("/api/scanner/result/{job_id}/full")
def get_full_result(job_id: str):
    full = OUTPUT / job_id / "credit_vivo_parser_result.json"
    if not full.exists():
        return JSONResponse({"ok": False, "error": "Full result not found"}, status_code=404)
    return JSONResponse(json.loads(full.read_text(encoding="utf-8")))
