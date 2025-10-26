@echo off
color 0A
cd /d c:\Users\M.Y.N\OneDrive\Documents\Aiproject50

echo.
echo ================================================================
echo   UPDATING GITHUB WITH CLOUD URL
echo ================================================================
echo.

echo Step 1: Delete FINAL-CLEAN.bat...
del FINAL-CLEAN.bat 2>nul

echo.
echo Step 2: Adding changes...
git add .

echo.
echo Step 3: Committing...
git commit -m "Update API URL to Render.com cloud deployment"

echo.
echo Step 4: Pushing to GitHub...
git push origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ================================================================
    echo                    SUCCESS! 🎉
    echo ================================================================
    echo.
    echo Your app now uses the cloud backend!
    echo.
    echo Backend URL: https://wasselni.onrender.com
    echo GitHub: https://github.com/yassin-tn/Wasselni
    echo.
    echo NEXT STEPS:
    echo   1. Restart your Expo app (Ctrl+C and run START-EVERYTHING.bat)
    echo   2. Test login/registration
    echo   3. Share QR code with your colleague
    echo   4. Your colleague can access from ANYWHERE!
    echo.
) else (
    echo Push failed!
)

pause
