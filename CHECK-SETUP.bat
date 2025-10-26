@echo off
color 0B
title Wasselni - Connection Diagnostic

echo.
echo ================================================================
echo              WASSELNI - CONNECTION DIAGNOSTIC
echo ================================================================
echo.
echo Checking your setup...
echo.

REM Check if backend is running
echo [1/4] Checking if backend server is running...
curl -s http://localhost:3000/api/health >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo     ✓ Backend server is RUNNING on port 3000
    curl -s http://localhost:3000/api/health
    echo.
) else (
    echo     ✗ Backend server is NOT running
    echo     → You need to start the backend first!
    echo.
)

REM Check Node.js
echo [2/4] Checking Node.js installation...
"C:\Program Files\nodejs\node.exe" --version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo     ✓ Node.js is installed
    "C:\Program Files\nodejs\node.exe" --version
) else (
    echo     ✗ Node.js not found!
)
echo.

REM Check if mobile folder exists
echo [3/4] Checking mobile app folder...
if exist "c:\Users\M.Y.N\OneDrive\Documents\Aiproject50\mobile" (
    echo     ✓ Mobile app folder exists
) else (
    echo     ✗ Mobile app folder not found!
)
echo.

REM Check if database exists
echo [4/4] Checking database...
if exist "c:\Users\M.Y.N\OneDrive\Documents\Aiproject50\backend\dev.db" (
    echo     ✓ Database file exists
) else (
    echo     ! Database file not found (will be created on first run)
)
echo.

echo ================================================================
echo                         RECOMMENDATIONS
echo ================================================================
echo.

curl -s http://localhost:3000/api/health >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ⚠ Backend is NOT running!
    echo.
    echo To fix:
    echo   1. Close this window
    echo   2. Double-click: START-EVERYTHING.bat
    echo   3. Wait for "Tunnel ready"
    echo   4. Share QR code with colleague
    echo.
) else (
    echo ✓ Backend is running!
    echo.
    echo Next steps:
    echo   1. Make sure Expo is running with tunnel mode
    echo   2. Look for "Tunnel ready" message
    echo   3. Share the QR code (take screenshot)
    echo   4. Colleague scans the SAME QR code
    echo   5. Both will use the same database!
    echo.
)

echo ================================================================
echo.
pause
