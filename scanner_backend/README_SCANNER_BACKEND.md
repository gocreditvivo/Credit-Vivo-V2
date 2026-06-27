# Credit Vivo Proprietary Scanner Backend v15.3

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
