param(
  [string]$Message = "Update Credit Vivo site",
  [switch]$Push
)

$ErrorActionPreference = "Stop"

$Source = "C:\CreditVivo\creditvivo_v1_clean_frontend\creditvivo_v1_clean_frontend"
$Repo = "C:\CreditVivo\_GITHUB\creditvivo-site"

if (!(Test-Path -LiteralPath $Source)) {
  throw "Source app folder not found: $Source"
}

if (!(Test-Path -LiteralPath (Join-Path $Repo ".git"))) {
  throw "GitHub working repo not found: $Repo"
}

Write-Host "Syncing current app into GitHub working repo..."
robocopy $Source $Repo /MIR /XD .git .next node_modules .vercel customer-files uploads credit-reports ids _backup_before_creditvivo_full_mvp src /XF .env *.local *.pem *.key *.pfx *.pdf *.xlsx *.xls *.csv *.zip
if ($LASTEXITCODE -gt 7) {
  throw "Robocopy failed with exit code $LASTEXITCODE"
}

Set-Location $Repo

Write-Host "Installing dependencies..."
npm ci

Write-Host "Building production app..."
npm run build

$changes = git status --porcelain
if (-not $changes) {
  Write-Host "No changes to commit."
  exit 0
}

Write-Host "Committing changes..."
git add -A
git commit -m $Message

if ($Push) {
  Write-Host "Pushing to GitHub. Vercel should auto-deploy from GitHub..."
  git push origin main
  Write-Host "Done. Verify https://www.creditvivo.com after Vercel finishes."
} else {
  Write-Host "Committed locally only. Review the commit, then run:"
  Write-Host "  git push origin main"
  Write-Host "Or rerun this script with -Push when you intentionally want Vercel deployment."
}
