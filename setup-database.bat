@echo off
echo 🕉️ DharmaVerse Database Setup
echo ============================

echo.
echo 📋 Step 1: Checking MongoDB installation...
mongosh --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ MongoDB not found. Please install MongoDB first.
    echo 💡 Download from: https://www.mongodb.com/try/download/community
    pause
    exit /b 1
)
echo ✅ MongoDB found

echo.
echo 📋 Step 2: Starting MongoDB service...
net start MongoDB >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️ MongoDB service might already be running or needs admin rights
)
echo ✅ MongoDB service ready

echo.
echo 📋 Step 3: Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)
echo ✅ Dependencies installed

echo.
echo 📋 Step 4: Initializing database...
call npm run init-db
if %errorlevel% neq 0 (
    echo ❌ Database initialization failed
    pause
    exit /b 1
)
echo ✅ Database initialized

echo.
echo 🎉 Database setup completed successfully!
echo.
echo 🚀 Next steps:
echo    1. Run 'npm run dev' to start the backend server
echo    2. Visit http://localhost:5001/api/health to verify
echo.
pause