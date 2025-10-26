@echo off
color 0E
title Wasselni - Cloud Backend Setup (ngrok)

echo.
echo ================================================================
echo          WASSELNI - PROPER REMOTE ACCESS SETUP
echo ================================================================
echo.
echo The problem: Expo tunnel only works for the app, not the backend!
echo The solution: We need to tunnel the BACKEND too using ngrok
echo.
echo This script will:
echo   1. Install ngrok (free tunnel service)
echo   2. Create a public URL for your backend
echo   3. Update the app to use that URL
echo   4. Then your colleague can connect from anywhere!
echo.
echo ================================================================
echo.
pause

echo.
echo Step 1: Installing ngrok...
echo.

REM Install ngrok globally
"C:\Program Files\nodejs\npm.cmd" install -g ngrok

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Failed to install ngrok
    echo.
    echo Please install manually:
    echo   1. Go to: https://ngrok.com/download
    echo   2. Download Windows version
    echo   3. Extract to C:\ngrok
    echo   4. Add to PATH
    echo.
    pause
    exit /b 1
)

echo.
echo ✓ ngrok installed!
echo.
echo Step 2: Starting backend server...
echo.

cd /d c:\Users\M.Y.N\OneDrive\Documents\Aiproject50\backend

start "Wasselni Backend" /MIN cmd /k ""C:\Program Files\nodejs\node.exe" src\server.js"

timeout /t 5 /nobreak >nul

echo ✓ Backend started on port 3000
echo.
echo Step 3: Creating public tunnel for backend...
echo.
echo ⚠ IMPORTANT: Copy the URL that appears below!
echo    It will look like: https://xxxx-xx-xx-xxx-xx.ngrok.io
echo.
echo    After copying the URL:
echo    1. Press Ctrl+C to stop ngrok
echo    2. Open: mobile\src\services\api.js
echo    3. Change line 10 to: const API_BASE_URL = 'https://YOUR-NGROK-URL/api';
echo    4. Run START-EVERYTHING.bat
echo    5. Share QR code with colleague
echo.
echo ================================================================
echo.

ngrok http 3000

pause
