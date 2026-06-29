# Credit Vivo Proprietary Scanner Backend v16

This scanner is redesigned to avoid paid AI APIs and avoid PyMuPDF.

## Removed

- Anthropic / Claude API dependency
- `ANTHROPIC_API_KEY`
- PyMuPDF dependency

## Uses

- Credit Vivo native rule-based parser
- pypdf for basic PDF text extraction
- FastAPI for backend API

## Local setup

```powershell
cd scanner_backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8080
```

Check:

```text
http://localhost:8080/health
```

## Important

This parser is proprietary to Credit Vivo, but it still uses permissive open-source libraries. Keep license notices in the package.

No customer letters or disputes should be sent automatically from parser output. Admin/customer approval is required.

## Free beta production notes

Set these environment variables on the backend host:

```text
CREDIT_VIVO_ALLOWED_ORIGINS=https://www.creditvivo.com,https://creditvivo.com
SCANNER_ENVIRONMENT=production
SCANNER_MAX_FILES=3
SCANNER_MAX_FILE_MB=25
SCANNER_RETAIN_UPLOADS=false
SCANNER_WRITE_RAW_TEXT=false
```

Default beta behavior:

- PDF uploads only.
- Maximum 3 files per request.
- Maximum 25 MB per file.
- Uploaded PDFs are deleted after parsing unless `SCANNER_RETAIN_UPLOADS=true`.
- Full raw extracted text files are not written unless `SCANNER_WRITE_RAW_TEXT=true`.
- Parser results still contain draft evidence snippets for customer/admin review.

Use a private backend host, HTTPS, restrictive CORS, and secure retention rules before accepting real customer reports.

## Render deployment

This repo includes `render.yaml` for deploying the scanner as a Render web service.

Recommended Render service:

- Service type: Web Service
- Runtime: Python
- Python version: `python-3.12.8` from root `runtime.txt`
- Build command: `pip install -r scanner_backend/requirements.txt`
- Start command: `cd scanner_backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
- Health check path: `/health`

Production environment variables:

```text
CREDIT_VIVO_ALLOWED_ORIGINS=https://www.creditvivo.com,https://creditvivo.com
SCANNER_ENVIRONMENT=production
SCANNER_MAX_FILES=3
SCANNER_MAX_FILE_MB=25
SCANNER_RETAIN_UPLOADS=false
SCANNER_WRITE_RAW_TEXT=false
SCANNER_STORAGE_DIR=/tmp/creditvivo-scanner
```

After Render deploys, verify:

```text
https://YOUR-RENDER-SERVICE.onrender.com/health
```

Expected response includes:

```json
{
  "ok": true,
  "service": "credit-vivo-proprietary-scanner-api"
}
```
