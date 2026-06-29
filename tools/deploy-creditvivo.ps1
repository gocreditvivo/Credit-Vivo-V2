param(
  [string]$Message = "Update Credit Vivo",
  [switch]$NoPush,
  [switch]$SkipBackendTests
)

$ErrorActionPreference = "Stop"

$Repo = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $Repo

if (!(Test-Path -LiteralPath ".git")) {
  throw "This script must run inside the Credit Vivo Git repository."
}

$branch = git branch --show-current
if ($branch -ne "main") {
  throw "Credit Vivo production deploys must run from main. Current branch: $branch"
}

Write-Host "Checking frontend types..."
npm run typecheck

Write-Host "Building frontend..."
npm run build

if (!$SkipBackendTests -and (Test-Path -LiteralPath "scanner_backend\tests")) {
  Write-Host "Running scanner backend tests..."
  Push-Location scanner_backend
  python -m pytest tests
  Pop-Location
}

$changes = git status --porcelain
if (-not $changes) {
  Write-Host "No changes to commit."
  exit 0
}

Write-Host "Committing Credit Vivo changes..."
git add -A
git commit -m $Message

if ($NoPush) {
  Write-Host "Committed locally only because -NoPush was used."
  Write-Host "When ready, push with: git push origin main"
  exit 0
}

Write-Host "Pushing to GitHub..."
git push origin main

Write-Host "Done. GitHub is updated."
Write-Host "Vercel should deploy the website from GitHub."
Write-Host "Render should deploy the scanner API from GitHub if auto-deploy is enabled there."
