@echo off
echo ================================================
echo    CARPOOLING APP - TUNNEL MODE LAUNCHER
echo ================================================
echo.
echo This will start Expo in TUNNEL mode so your
echo colleague can access the app from ANYWHERE!
echo.
echo Your computer must stay ON and CONNECTED to
echo internet while she uses the app.
echo.
echo ================================================
echo.
echo Starting tunnel... Please wait 1-2 minutes...
echo.

cd /d c:\Users\M.Y.N\OneDrive\Documents\Aiproject50\mobile

set NODE_PATH=C:\Program Files\nodejs
set PATH=%NODE_PATH%;%PATH%

"%NODE_PATH%\node.exe" "%NODE_PATH%\node_modules\npm\bin\npx-cli.js" expo start --tunnel

pause
