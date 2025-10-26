@echo off
title Wasselni - Complete Setup

echo.
echo ================================================================
echo           WASSELNI - AUTOMATIC SETUP FOR SHARING
echo ================================================================
echo.
echo This will automatically:
echo   1. Fix firewall (needs admin)
echo   2. Start backend server
echo   3. Start Expo tunnel
echo   4. Show you the QR code to share
echo.
echo ================================================================
echo.

REM Check for admin rights
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Step 1: Requesting Administrator privileges...
    echo.
    
    REM Re-run as admin
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

echo Step 1: Fixing firewall...
echo.

REM Add firewall rules
netsh advfirewall firewall delete rule name="Wasselni Backend (Node.js)" >nul 2>&1
netsh advfirewall firewall add rule name="Wasselni Backend (Node.js)" dir=in action=allow protocol=TCP localport=3000 enable=yes >nul 2>&1

netsh advfirewall firewall delete rule name="Wasselni Node.js Executable" >nul 2>&1
netsh advfirewall firewall add rule name="Wasselni Node.js Executable" dir=in action=allow program="C:\Program Files\nodejs\node.exe" enable=yes >nul 2>&1

echo ✓ Firewall configured!
echo.
echo Step 2: Starting backend server...
echo.

cd /d c:\Users\M.Y.N\OneDrive\Documents\Aiproject50\backend
start "Wasselni Backend" cmd /k "echo Wasselni Backend Server && echo. && echo Server URL: http://localhost:3000 && echo. && "C:\Program Files\nodejs\node.exe" src\server.js"

timeout /t 5 /nobreak >nul

echo ✓ Backend started!
echo.
echo Step 3: Starting Expo tunnel (this takes 1-2 minutes)...
echo.

cd /d c:\Users\M.Y.N\OneDrive\Documents\Aiproject50\mobile

set NODE_PATH=C:\Program Files\nodejs
set PATH=%NODE_PATH%;%PATH%

echo.
echo ================================================================
echo  EVERYTHING IS STARTING!
echo ================================================================
echo.
echo Please wait for the QR code to appear...
echo Then share it with your colleague!
echo.
echo ⚠ Keep this window open while your colleague uses the app
echo.
echo ================================================================
echo.

"%NODE_PATH%\node.exe" "%NODE_PATH%\node_modules\npm\bin\npx-cli.js" expo start --tunnel

pause
