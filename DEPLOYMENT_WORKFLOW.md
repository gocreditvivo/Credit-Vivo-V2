# Credit Vivo Default Deployment Workflow

Use this process every time Credit Vivo website or portal files change.

## Default Rule

1. Edit files locally.
2. Run `npm run build`.
3. Commit changes to Git.
4. Push to GitHub.
5. Let Vercel deploy from GitHub.
6. Verify `https://www.creditvivo.com`.

## Local App

Current working app:

`C:\CreditVivo\creditvivo_v1_clean_frontend\creditvivo_v1_clean_frontend`

Local preview:

`http://127.0.0.1:3000`

## GitHub

Target repository:

`https://github.com/gocreditvivo/creditvivo-site`

## Vercel

Vercel should stay connected to the GitHub repository. After each push to the production branch, Vercel should rebuild and publish the site automatically.

## Do Not Commit

- `.env` files
- customer credit reports
- customer IDs
- payment keys
- GitHub tokens
- Vercel tokens
- bureau credentials
- real customer documents

## Verification Checklist

- `npm run build` passes.
- `/`, `/scan`, `/privacy`, `/terms`, `/disclosure`, `/pricing`, `/faq`, and `/signup` load.
- Security headers are present.
- Demo scan still creates a case.
- Live domain opens after Vercel deploys.
