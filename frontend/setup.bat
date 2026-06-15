@echo off
REM Setup script for React Frontend

echo.
echo ========================================
echo Book Management System - React Setup
echo ========================================
echo.

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js/npm is not installed
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/3] Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/3] Dependencies installed successfully!
echo.
echo [3/3] Ready to start development server
echo.
echo ========================================
echo To start the server, run:
echo    npm run dev
echo ========================================
echo.

pause
