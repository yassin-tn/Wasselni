@echo off
color 0A
title Wasselni - Share with Colleague

echo.
echo ================================================================
echo                 WASSELNI - COLLEAGUE ACCESS MODE
echo ================================================================
echo.

REM Check if firewall rule exists
netsh advfirewall firewall show rule name="Wasselni Backend (Node.js)" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ⚠ WARNING: Firewall rule not found!
    echo.
    echo Your colleague might not be able to connect.
    echo.
    echo To fix this:
    echo   1. Close this window
    echo   2. Right-click FIX-FIREWALL.bat
    echo   3. Select "Run as administrator"
    echo   4. Then run this script again
    echo.
    echo ================================================================
    echo.
    choice /C YN /M "Continue anyway (firewall might block)"
    if errorlevel 2 exit /b
    echo.
)

echo This script will:
echo   1. Start your Backend Server (Port 3000)
echo   2. Start Expo in TUNNEL MODE (for remote access)
echo.
echo After both are running, share the QR code with your colleague!
echo.
echo ================================================================
echo.

echo Step 1: Starting Backend Server...
echo ================================================================
start "Backend Server" cmd /k "cd /d c:\Users\M.Y.N\OneDrive\Documents\Aiproject50\backend && echo Backend Server Starting... && echo. && "C:\Program Files\nodejs\node.exe" src\server.js"

echo.
echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak >nul

echo.
echo Step 2: Starting Expo Tunnel Mode...
echo ================================================================
echo This may take 1-2 minutes for the tunnel to be ready...
echo.

cd /d c:\Users\M.Y.N\OneDrive\Documents\Aiproject50\mobile

set NODE_PATH=C:\Program Files\nodejs
set PATH=%NODE_PATH%;%PATH%

echo.
echo ================================================================
echo  IMPORTANT: You and your colleague must be on the SAME WiFi!
echo ================================================================
echo.
echo Expo tunnel does NOT tunnel your backend server.
echo Both phones must be on the same WiFi network as this computer.
echo.
echo If not on same WiFi, read: EXPO-TUNNEL-PROBLEM.md
echo.
echo ================================================================
echo.

"%NODE_PATH%\node.exe" "%NODE_PATH%\node_modules\npm\bin\npx-cli.js" expo start

pause
