@echo off
chcp 65001 >nul
title TOKA-SYSTEM - Fix Port 4000

echo.
echo ========================================
echo    TOKA-SYSTEM - CORREÇÃO DE PORTA
echo ========================================
echo.
echo Verificando processos na porta 4000...
echo.

:: Encontrar e matar processos na porta 4000
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :4000') do (
    echo Processo encontrado na porta 4000: %%a
    taskkill /f /pid %%a 2>nul
    if !errorlevel! equ 0 (
        echo ✅ Processo %%a finalizado com sucesso
    ) else (
        echo ❌ Não foi possível finalizar o processo %%a
    )
)

echo.
echo Aguardando 3 segundos para liberar a porta...
timeout /t 3 /nobreak >nul

echo.
echo Iniciando o servidor backend...
echo.

:: Iniciar o backend
cd src\api
npm run dev

echo.
echo [INFO] Servidor iniciado!
pause 
