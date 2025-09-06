@echo off
echo 🏆 DharmaVerse Authentication Setup - Hackathon Winner!
echo ========================================================

echo.
echo 📋 Step 1: Installing backend dependencies...
cd backend
call npm install google-auth-library crypto validator
if %errorlevel% neq 0 (
    echo ❌ Backend dependency installation failed
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed

echo.
echo 📋 Step 2: Installing frontend dependencies...
cd ..
call npm install @react-oauth/google react-facebook-login react-github-login
if %errorlevel% neq 0 (
    echo ❌ Frontend dependency installation failed
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed

echo.
echo 📋 Step 3: Setting up database with authentication...
cd backend
call npm run init-db
if %errorlevel% neq 0 (
    echo ❌ Database initialization failed
    pause
    exit /b 1
)
echo ✅ Database initialized with auth models

echo.
echo 🎉 Authentication System Setup Complete!
echo.
echo 🚀 Next Steps:
echo    1. Configure OAuth apps (Google, Facebook, GitHub)
echo    2. Update .env files with OAuth credentials
echo    3. Run 'npm run dev' in backend folder
echo    4. Run 'npm start' in root folder
echo    5. Visit http://localhost:3000
echo.
echo 🏆 Your hackathon-winning auth system is ready!
echo.
echo 📖 Check AUTHENTICATION_SETUP.md for OAuth configuration
echo.
pause