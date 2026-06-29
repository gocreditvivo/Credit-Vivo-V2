param(
  [string]$Message = "Update Credit Vivo",
  [switch]$NoPush,
  [switch]$SkipBackendTests,
  [string]$Python = ""
)

$ErrorActionPreference = "Stop"

$Repo = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $Repo

function Invoke-Checked {
  param(
    [string]$Command,
    [string[]]$Arguments,
    [string]$StepName
  )

  Write-Host $StepName
  & $Command @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw "$StepName failed with exit code $LASTEXITCODE"
  }
}

if (!(Test-Path -LiteralPath ".git")) {
  throw "This script must run inside the Credit Vivo Git repository."
}

$branch = git branch --show-current
if ($branch -ne "main") {
  throw "Credit Vivo production deploys must run from main. Current branch: $branch"
}

Invoke-Checked "npm" @("run", "typecheck") "Checking frontend types..."

Invoke-Checked "npm" @("run", "build") "Building frontend..."

if (!$SkipBackendTests -and (Test-Path -LiteralPath "scanner_backend\tests")) {
  if (!$Python) {
    $bundledPython = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
    if (Test-Path -LiteralPath $bundledPython) {
      $Python = $bundledPython
    } else {
      $Python = "python"
    }
  }

  $pytestTemp = Join-Path $Repo "work\pytest-tmp"
  New-Item -ItemType Directory -Force -Path $pytestTemp | Out-Null

  Push-Location scanner_backend
  Invoke-Checked $Python @("-m", "pytest", "tests", "--basetemp", $pytestTemp) "Running scanner backend tests..."
  Pop-Location
}

$changes = git status --porcelain
if (-not $changes) {
  Write-Host "No changes to commit."
  exit 0
}

Write-Host "Committing Credit Vivo changes..."
git add -A
if ($LASTEXITCODE -ne 0) {
  throw "git add failed with exit code $LASTEXITCODE"
}
git commit -m $Message
if ($LASTEXITCODE -ne 0) {
  throw "git commit failed with exit code $LASTEXITCODE"
}

if ($NoPush) {
  Write-Host "Committed locally only because -NoPush was used."
  Write-Host "When ready, push with: git push origin main"
  exit 0
}

Write-Host "Pushing to GitHub..."
git push origin main
if ($LASTEXITCODE -ne 0) {
  throw "git push failed with exit code $LASTEXITCODE"
}

Write-Host "Done. GitHub is updated."
Write-Host "Vercel should deploy the website from GitHub."
Write-Host "Render should deploy the scanner API from GitHub if auto-deploy is enabled there."
