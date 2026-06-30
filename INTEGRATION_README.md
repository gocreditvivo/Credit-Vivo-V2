# Credit Vivo Emergent Integration Package

Source preview:
https://credit-boost-ai-2.preview.emergentagent.com/?utm_source=share

Purpose:
This package preserves the Emergent "credit-boost-ai-2" code so Credit Vivo can review it and selectively integrate useful parts into the main Credit Vivo codebase later.

## Included

- `frontend/`
  - React Create React App / Craco frontend
  - Landing page, login/register, dashboard, pricing/phase 2 pages, mini analyzer, navbar, UI components
- `backend/`
  - FastAPI backend source discovered from the Emergent workspace
  - Python requirements
- `memory/PRD.md`
  - Emergent product notes / feature summary
- `SAFE_GRAB_MANIFEST.json`
  - Original pull manifest

## Excluded

- Real `.env` files
- API keys
- Passwords
- Demo/test credential file
- `node_modules`
- Build cache

## Use With Care

This is not production-ready by itself.

Before integrating:

1. Security-review the backend, auth, admin routes, and document storage.
2. Replace demo or preview secrets with real environment variables.
3. Remove any demo credentials or test-only copy.
4. Confirm CROA/FCRA/compliance wording with counsel.
5. Connect only to approved scanner, payment, mail, and credit-report APIs.
6. Test build, routes, scanner flow, account creation, and customer-data handling.

Known warning:

- `backend/server.py` has a development fallback of `JWT_SECRET = dev-secret`.
  Production must require a strong secret from environment variables and should not use a fallback.

## Best Integration Path

Use this as a design/product reference first:

- Pull the landing page sections you like.
- Pull dashboard/page layouts you like.
- Pull mini analyzer ideas only after compliance review.
- Do not replace the existing scanner backend with this until audited.

Plain English:
This is the "good idea box." We should copy the good front-end look and workflows, then connect them to the safer Credit Vivo backend piece by piece.
