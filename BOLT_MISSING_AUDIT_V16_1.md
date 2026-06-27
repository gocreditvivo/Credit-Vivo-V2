# Bolt Missing Audit — v16.1

## What Bolt was missing

Bolt created a good visual website, but the parser/scanner was not truly connected to the member pages.

Missing items fixed in this update:

1. `/scan` page had only a static button.
2. `/scan` did not upload PDF files.
3. `/scan` did not call the scanner backend.
4. `/findings` page showed static demo numbers only.
5. `/findings` did not read scanner results.
6. Dashboard did not reflect scan results.
7. There was no local scan-result storage helper.
8. There was no internal admin review page.
9. There was no route for admin/internal review output.
10. There was no UI connection to `src/lib/scannerApi.ts`.

## What was added

- `src/lib/scanStorage.ts`
- Updated `src/pages/FreeScan.tsx`
- Updated `src/pages/Findings.tsx`
- Updated `src/pages/Dashboard.tsx`
- Added `src/pages/AdminReview.tsx`
- Updated `src/App.tsx`
- Added this audit file

## What stayed locked

Public website layout was not changed.

No changes were made to:
- public homepage layout
- public navigation
- public marketing page sections
- public typography
- pricing page layout
- FAQ page layout
- learning page layout
- compliance page layout

## Scanner backend

Backend remains in:

`scanner_backend/`

Local run:

```powershell
cd scanner_backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8080
```

Frontend env:

```env
VITE_SCANNER_API_URL=http://localhost:8080
```

## Important

No letters or disputes are sent automatically. Parser output remains draft review data.
