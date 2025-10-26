@echo off
color 0A
title Wasselni - Push to GitHub

echo.
echo ================================================================
echo              WASSELNI - PUSH TO GITHUB
echo ================================================================
echo.
echo This will push your code to GitHub repository: Wasselni
echo.
echo Make sure you have:
echo   1. Created a repository named "Wasselni" on GitHub
echo   2. Git installed on your computer
echo.
echo ================================================================
echo.
pause

cd /d c:\Users\M.Y.N\OneDrive\Documents\Aiproject50

echo.
echo Step 1: Checking if Git is installed...
echo.

git --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Git is not installed!
    echo.
    echo Please install Git:
    echo   1. Go to: https://git-scm.com/download/win
    echo   2. Download and install
    echo   3. Run this script again
    echo.
    pause
    exit /b 1
)

git --version
echo ✓ Git is installed!
echo.

echo Step 2: Initializing Git repository...
echo.

git init

echo.
echo Step 3: Adding all files...
echo.

git add .

echo.
echo Step 4: Configuring Git user...
echo.

REM Check if git user is configured
git config user.name >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Setting up Git user configuration...
    set /p GIT_NAME="Enter your name: "
    set /p GIT_EMAIL="Enter your email: "
    git config --global user.name "!GIT_NAME!"
    git config --global user.email "!GIT_EMAIL!"
    echo ✓ Git user configured!
) else (
    echo ✓ Git user already configured
)

echo.
echo Step 5: Creating first commit...
echo.

git commit -m "Initial commit - Wasselni carpooling app for Tunisia"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo No changes to commit or commit failed.
    echo Checking if there are any changes...
    git status
    echo.
)

echo.
echo Step 6: Setting up GitHub remote...
echo.
echo ⚠ IMPORTANT: What is your GitHub username?
echo.
set /p GITHUB_USERNAME="Enter your GitHub username: "

echo.
echo Adding remote repository...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/%GITHUB_USERNAME%/Wasselni.git

echo.
echo Step 7: Renaming branch to main...
echo.

git branch -M main

echo.
echo Step 8: Checking branch status...
echo.

git branch
git status

echo.
echo Step 9: Pushing to GitHub...
echo.
echo ⚠ You may need to enter your GitHub credentials
echo.

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ================================================================
    echo                    SUCCESS! 🎉
    echo ================================================================
    echo.
    echo Your code has been pushed to GitHub!
    echo.
    echo Repository URL:
    echo https://github.com/%GITHUB_USERNAME%/Wasselni
    echo.
    echo Next steps:
    echo   1. Go to the URL above
    echo   2. You should see all your files
    echo   3. Copy README-GITHUB.md content to README.md on GitHub
    echo   4. Now you can deploy to Render.com from this repo!
    echo.
    echo ================================================================
) else (
    echo.
    echo ❌ Failed to push to GitHub
    echo.
    echo Common issues:
    echo   1. Repository "Wasselni" doesn't exist on GitHub
    echo   2. Wrong username
    echo   3. Authentication failed
    echo.
    echo Solutions:
    echo   1. Go to https://github.com/new
    echo   2. Create repository named "Wasselni"
    echo   3. Make it PUBLIC
    echo   4. Don't initialize with README
    echo   5. Run this script again
    echo.
)

echo.
pause
