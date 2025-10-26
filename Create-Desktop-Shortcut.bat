@echo off
echo Creating desktop shortcut...

set SCRIPT_PATH=%~dp0START-EVERYTHING.bat
set SHORTCUT_PATH=%USERPROFILE%\Desktop\Start Carpooling App.lnk

powershell -Command "$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut('%SHORTCUT_PATH%'); $s.TargetPath = '%SCRIPT_PATH%'; $s.IconLocation = 'shell32.dll,14'; $s.Description = 'Start Carpooling App for Colleague Access'; $s.Save()"

if exist "%SHORTCUT_PATH%" (
    echo.
    echo ================================================================
    echo   SUCCESS! Shortcut created on your Desktop
    echo ================================================================
    echo.
    echo You can now double-click "Start Carpooling App" on your
    echo desktop to start everything!
    echo.
    echo ================================================================
) else (
    echo.
    echo Failed to create shortcut. You can manually double-click:
    echo START-EVERYTHING.bat
    echo.
)

pause
