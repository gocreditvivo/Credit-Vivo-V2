# Third-Party Components

This package is designed to avoid paid AI APIs and avoid AGPL/commercial PDF dependencies.

## Included / expected dependencies

### FastAPI
Purpose: backend API server  
License: MIT  
Credit Vivo use: API adapter only

### pypdf
Purpose: PDF text extraction  
License: BSD-3-Clause / permissive open-source  
Credit Vivo use: extracts text from PDF files before Credit Vivo native parser runs

### React / Vite / frontend tooling
Purpose: frontend application  
License: open-source licenses depending on package  
Credit Vivo use: website/dashboard build tooling

## Removed from v15.3

- Anthropic / Claude API dependency
- `ANTHROPIC_API_KEY`
- PyMuPDF dependency

## Compliance note

Permissive open-source licenses usually do not require payment or special permission for commercial use, but they often require preserving copyright and license notices. Keep this file and package lock files with the project.
