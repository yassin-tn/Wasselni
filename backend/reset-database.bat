@echo off
echo Resetting database with Tunisian data...
echo.

REM Delete the old database
if exist "dev.db" (
    echo Deleting old database...
    del /f dev.db
    echo Database deleted!
) else (
    echo No database found, creating new one...
)

echo.
echo Starting backend server...
echo The server will create a new database with Tunisian locations!
echo.

"C:\Program Files\nodejs\node.exe" src\server.js
