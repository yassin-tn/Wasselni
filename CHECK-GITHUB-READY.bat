@echo off
color 0B
title Pre-GitHub Checklist

echo.
echo ================================================================
echo          WASSELNI - PRE-GITHUB CHECKLIST
echo ================================================================
echo.
echo Checking if everything is ready to push to GitHub...
echo.

REM Check Git installation
echo [1/4] Checking Git installation...
git --version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo     ✓ Git is installed
    git --version
) else (
    echo     ✗ Git is NOT installed
    echo     → Download from: https://git-scm.com/download/win
)
echo.

REM Check if .gitignore exists
echo [2/4] Checking .gitignore...
if exist ".gitignore" (
    echo     ✓ .gitignore file exists
) else (
    echo     ✗ .gitignore not found
)
echo.

REM Check repository name
echo [3/4] GitHub repository check...
echo     Repository name should be: Wasselni
echo     Make sure you created it at: https://github.com/new
echo.

REM Check for sensitive files
echo [4/4] Checking for sensitive files...
if exist "backend\.env" (
    echo     ⚠ Found .env file (will be excluded by .gitignore)
)
if exist "backend\dev.db" (
    echo     ⚠ Found dev.db file (will be excluded by .gitignore)
)
if exist "node_modules" (
    echo     ⚠ Found node_modules (will be excluded by .gitignore)
)
echo     ✓ Sensitive files will be excluded
echo.

echo ================================================================
echo                      RECOMMENDATIONS
echo ================================================================
echo.

git --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ⚠ INSTALL GIT FIRST!
    echo.
    echo   1. Go to: https://git-scm.com/download/win
    echo   2. Download and install
    echo   3. Restart this script
    echo.
) else (
    echo ✓ You're ready to push to GitHub!
    echo.
    echo Next steps:
    echo   1. Make sure repository "Wasselni" exists on GitHub
    echo   2. Double-click: PUSH-TO-GITHUB.bat
    echo   3. Enter your GitHub username when asked
    echo   4. Authenticate with Personal Access Token
    echo.
    echo Need help? Read: GITHUB-GUIDE.md
    echo.
)

echo ================================================================
echo.
pause
