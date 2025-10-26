@echo off
echo.
echo ========================================
echo   Carpooling App - Seed Sample Data
echo ========================================
echo.
echo Creating sample users, vehicles, and rides...
echo.

timeout /t 2 /nobreak > nul

curl -X POST http://192.168.1.11:3000/api/seed/seed -H "Content-Type: application/json"

echo.
echo.
echo Done! Check the response above.
echo.
echo Sample login credentials:
echo   Email: john.driver@example.com
echo   Password: password123
echo.
echo   Email: sarah.commuter@example.com  
echo   Password: password123
echo.
echo   Email: mike.traveler@example.com
echo   Password: password123
echo.
pause
