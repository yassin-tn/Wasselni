@echo off
color 0E
title Wasselni - Quick Fix for Colleague Access

echo.
echo ============================================================
echo   WASSELNI - QUICK FIX (Public URL for Your Colleague)
echo ============================================================
echo.
echo This will create a PUBLIC URL that your colleague can use!
echo.
echo Installing ngrok (tunnel service)...
echo.

REM Check if ngrok is installed
where ngrok >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ngrok not found. Installing via npm...
    "C:\Program Files\nodejs\npm.cmd" install -g ngrok
    echo.
    echo ngrok installed!
    echo.
)

echo.
echo Starting your backend server...
echo.

cd /d c:\Users\M.Y.N\OneDrive\Documents\Aiproject50\backend

REM Start backend in background
start "Wasselni Backend" /MIN cmd /k ""C:\Program Files\nodejs\node.exe" src\server.js"

echo Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo.
echo ============================================================
echo   Creating public tunnel...
echo ============================================================
echo.
echo This will give you a URL like: https://xxxx.ngrok.io
echo.
echo Copy this URL and I'll show you what to do next!
echo.
echo ============================================================
echo.

ngrok http 3000

pause
