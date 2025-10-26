@echo off
:: Check for admin rights
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo.
    echo ================================================================
    echo   This script needs Administrator privileges!
    echo ================================================================
    echo.
    echo Please right-click this file and select "Run as administrator"
    echo.
    pause
    exit /b 1
)

color 0A
title Wasselni - Fix Firewall

echo.
echo ================================================================
echo          WASSELNI - FIREWALL FIX (Administrator)
echo ================================================================
echo.
echo This will add firewall rules to allow connections to your backend
echo.
echo Creating firewall rules...
echo.

REM Allow Node.js incoming connections on port 3000
netsh advfirewall firewall delete rule name="Wasselni Backend (Node.js)" >nul 2>&1
netsh advfirewall firewall add rule name="Wasselni Backend (Node.js)" dir=in action=allow protocol=TCP localport=3000 enable=yes

if %ERRORLEVEL% EQU 0 (
    echo ✓ Port 3000 opened for TCP connections
) else (
    echo ✗ Failed to open port 3000
)

REM Allow Node.js executable
netsh advfirewall firewall delete rule name="Wasselni Node.js Executable" >nul 2>&1
netsh advfirewall firewall add rule name="Wasselni Node.js Executable" dir=in action=allow program="C:\Program Files\nodejs\node.exe" enable=yes

if %ERRORLEVEL% EQU 0 (
    echo ✓ Node.js executable allowed through firewall
) else (
    echo ✗ Failed to allow Node.js
)

REM Allow outbound connections
netsh advfirewall firewall delete rule name="Wasselni Backend Outbound" >nul 2>&1
netsh advfirewall firewall add rule name="Wasselni Backend Outbound" dir=out action=allow protocol=TCP localport=3000 enable=yes

if %ERRORLEVEL% EQU 0 (
    echo ✓ Outbound connections allowed
) else (
    echo ✗ Failed to allow outbound
)

echo.
echo ================================================================
echo                    FIREWALL RULES ADDED!
echo ================================================================
echo.
echo The following rules were created:
echo   1. Wasselni Backend (Node.js) - Port 3000 TCP Inbound
echo   2. Wasselni Node.js Executable - Node.exe allowed
echo   3. Wasselni Backend Outbound - Port 3000 TCP Outbound
echo.
echo Your colleague should now be able to connect!
echo.
echo ================================================================
echo.
echo Next steps:
echo   1. Close this window
echo   2. Run: START-EVERYTHING.bat
echo   3. Share QR code with colleague
echo   4. She should be able to connect now!
echo.
echo ================================================================
echo.

pause
