# Bolt Integration Prompt — Credit Vivo Proprietary Parser v16

Use this project and integrate the scanner into the member/admin areas only.

## Hard rule

Do not change the approved public website layout.

Do not change:
- Homepage layout
- Public navigation
- Public typography
- Public page sections
- Button design
- Visual design

## Parser type

Use Credit Vivo Proprietary Parser Engine v16.

Do not add:
- Anthropic
- Claude
- paid AI API
- PyMuPDF
- competitor code

## Backend

Use:
`scanner_backend/main.py`

Run locally:

```powershell
cd scanner_backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8080
```

## Frontend helper

Use:
`src/lib/scannerApi.ts`

Set:

```env
VITE_SCANNER_API_URL=http://localhost:8080
```

## Customer-facing UI terms

Use:
- Credit Check-In
- Credit Roadmap
- Findings
- Review Items
- Monthly Action Plan
- Track Progress

Avoid:
- Parser
- Anthropic
- Claude
- Metro 2
- FCRA engine
- Violation codes
- Dispute everything
- Guaranteed removal
- Guaranteed score increase

## Findings display

Display only clean customer categories:
- Profile Cleanup
- Collection Review
- Bureau Match Review
- Reporting Accuracy Review
- Factual Review
- Needs Admin Review

## Admin display

Admin can see:
- confidence score
- raw evidence snippet
- bureau
- page number
- suggested round
- issue type
- related tradelines

## Important

Parser output is draft review data. No letters or disputes should be sent automatically.
