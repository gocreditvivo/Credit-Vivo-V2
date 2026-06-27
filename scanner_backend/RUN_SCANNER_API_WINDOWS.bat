@echo off
cd /d "%~dp0"
echo Starting Credit Vivo Scanner API...
python -m uvicorn main:app --reload --port 8080
pause
