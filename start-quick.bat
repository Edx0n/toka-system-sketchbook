@echo off
chcp 65001 >nul
title TOKA-SYSTEM - Inicialização Rápida

echo.
echo ========================================
echo    TOKA-SYSTEM - INICIALIZAÇÃO RÁPIDA
echo ========================================
echo.
echo Verificando porta 4000...
echo.

:: Verificar se a porta 4000 está em uso e liberar se necessário
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :4000 2^>nul') do (
    echo ⚠️  Porta 4000 em uso. Finalizando processo %%a...
    taskkill /f /pid %%a 2>nul
    if !errorlevel! equ 0 (
        echo ✅ Porta 4000 liberada
    )
)

:: Aguardar um pouco para garantir que a porta foi liberada
timeout /t 2 /nobreak >nul

echo.
echo Iniciando o projeto...
echo.

:: Iniciar backend em uma nova janela
echo [BACKEND] Iniciando servidor backend...
start "TOKA-SYSTEM Backend" cmd /k "cd src\api && npm run dev"

:: Aguardar um pouco para o backend inicializar
timeout /t 3 /nobreak >nul

:: Iniciar frontend
echo [FRONTEND] Iniciando servidor frontend...
npm run dev

echo.
echo [INFO] Serviços iniciados!
pause 
