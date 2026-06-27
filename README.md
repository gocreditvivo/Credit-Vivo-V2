

# Credit Vivo Bolt Build — Reviewed Version

## What was fixed
- Removed an unused TypeScript import so `npm run typecheck` passes.
- Added `public/_redirects` for static SPA hosting.
- Added `vercel.json` rewrite support for Vercel deployment.

## Run locally
```bash
npm install
npm run dev
```

## Verify before deploy
```bash
npm run typecheck
npm run build
```

## Notes
This is still a demo/public website. Real authentication, payments, report uploads, and credit-processing backend are not connected yet.

## v15.1 Content Audit + Layout Lock

This package adds:
- `CONTENT_AUDIT_V15_1.md`
- `FEATURE_LAYOUT_LOCK_RULES.md`
- `NEXT_FEATURE_PROMPT_LAYOUT_SAFE.md`
- Restored content source docs from the v14.3 handoff package

No public layout files were changed in v15.1.


## v15.2 Parser/Scanner Integration Handoff

This build includes a layout-safe parser/scanner integration package.

Added:
- `scanner_backend/` FastAPI backend adapter
- `src/lib/scannerApi.ts` frontend API helper
- `SCANNER_INTEGRATION_PROMPT_FOR_BOLT.md`
- `SCANNER_API_CONTRACT.md`
- `PARSER_SCANNER_UPDATE_NOTES_V12_9.md`
- `ENV_FRONTEND_EXAMPLE.env`

Public page layout was not changed.


## v15.3 Note
This version removes Anthropic/Claude and PyMuPDF dependencies. It uses Credit Vivo Native Parser with no paid AI API.


## v16 Proprietary Parser Engine Upgrade

This version adds the stronger Credit Vivo Proprietary Parser Engine.

Added:
- `scanner_backend/credit_vivo_proprietary_engine.py`
- normalized tradeline schema
- issue detection engine
- cross-bureau matching
- confidence scoring
- evidence snippets
- JSON/CSV outputs
- parser tests
- competitive moat plan
- v16→v20 roadmap

Public website layout was not changed.


## v16.1 Integration Fix

Bolt was missing the actual UI wiring between the member pages and the parser backend.

Fixed:
- `/scan` now accepts PDF upload and calls scanner backend.
- `/findings` now reads the last scan result.
- `/dashboard` now reflects scan result counts.
- `/admin-review` added for internal review preview.
- Public layout remains locked.
