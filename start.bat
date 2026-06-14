@echo off
echo Starting MEEM Game Server...
echo.
echo The game will be available at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

cd /d "%~dp0"
npx serve dist -p 3000
