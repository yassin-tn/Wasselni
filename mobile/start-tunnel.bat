@echo off
echo Starting Expo with Tunnel Mode...
echo This allows your colleague to connect from anywhere!
echo.
echo Please wait, this may take a minute...
echo.

cd /d c:\Users\M.Y.N\OneDrive\Documents\Aiproject50\mobile

"C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs\node_modules\npm\bin\npx-cli.js" expo start --tunnel

pause
