@echo off
color 0A
cd /d c:\Users\M.Y.N\OneDrive\Documents\Aiproject50

echo.
echo ================================================================
echo   FINAL CLEAN PUSH - NO TOKENS IN CODE
echo ================================================================
echo.

echo Step 1: Deleting ULTIMATE-FIX.bat (has token)...
del ULTIMATE-FIX.bat

echo.
echo Step 2: Adding changes...
git add .

echo.
echo Step 3: Amending the commit (replace it)...
git commit --amend -m "Initial commit - Wasselni carpooling app for Tunisia"

echo.
echo Step 4: Force pushing to GitHub...
echo.
echo When prompted for password, use your token
echo (The one that starts with ghp_...)
echo.

git push -f origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ================================================================
    echo                    SUCCESS! 🎉🎉🎉
    echo ================================================================
    echo.
    echo Your Wasselni app is NOW on GitHub!
    echo https://github.com/yassin-tn/Wasselni
    echo.
    echo IMPORTANT: Go revoke your token NOW!
    echo https://github.com/settings/tokens
    echo Delete the token - it was exposed!
    echo.
    echo Next: Deploy to Render.com!
    echo.
) else (
    echo.
    echo Push failed!
    echo.
)

pause
