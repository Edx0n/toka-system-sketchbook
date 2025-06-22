@echo off
chcp 65001 >nul
title TOKA-SYSTEM - Inicialização Rápida

echo.
echo ========================================
echo    TOKA-SYSTEM - INICIALIZAÇÃO RÁPIDA
echo ========================================
echo.
echo Iniciando o projeto...
echo.

:: Iniciar backend em uma nova janela
echo [BACKEND] Iniciando servidor backend...
start "TOKA-SYSTEM Backend" cmd /k "cd src\api && npm run dev"

:: Aguardar um pouco para o backend inicializar
timeout /t 2 /nobreak >nul

:: Iniciar frontend
echo [FRONTEND] Iniciando servidor frontend...
npm run dev

echo.
echo [INFO] Serviços iniciados!
pause 
