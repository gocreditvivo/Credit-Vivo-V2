# Credit Vivo Default Deployment Workflow

Use this process every time Credit Vivo website or portal files change.

## Default Rule

1. Edit files locally.
2. Run `npm run build`.
3. Commit changes to Git.
4. Review the commit before pushing.
5. Push to GitHub only when the change is approved for production.
6. Let Vercel deploy from GitHub.
7. Verify `https://www.creditvivo.com`.

## Local App

Current working app:

`C:\CreditVivo\creditvivo_v1_clean_frontend\creditvivo_v1_clean_frontend`

Local preview:

`http://127.0.0.1:3000`

## GitHub

Target repository:

`https://github.com/gocreditvivo/creditvivo-site`

## Vercel

Vercel should stay connected to the GitHub repository. After each approved push to the production branch, Vercel should rebuild and publish the site automatically.

Do not auto-push every local change. Production deployment should require a deliberate `git push origin main` or running `tools\deploy-creditvivo.ps1 -Push`.

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

## Safer Deploy Script

`tools\deploy-creditvivo.ps1` now commits locally by default and does not push unless `-Push` is provided.

Examples:

```powershell
.\tools\deploy-creditvivo.ps1 -Message "Update homepage"
```

Creates the local commit only.

```powershell
.\tools\deploy-creditvivo.ps1 -Message "Update homepage" -Push
```

Commits and pushes to GitHub, which triggers Vercel.
