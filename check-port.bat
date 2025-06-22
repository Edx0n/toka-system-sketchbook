@echo off
chcp 65001 >nul
title TOKA-SYSTEM - Verificar Porta 4000

echo.
echo ========================================
echo    TOKA-SYSTEM - VERIFICAR PORTA 4000
echo ========================================
echo.
echo Verificando processos na porta 4000...
echo.

:: Verificar se há processos na porta 4000
netstat -aon | findstr :4000

if %errorlevel% equ 0 (
    echo.
    echo ⚠️  Processos encontrados na porta 4000!
    echo.
    echo Para finalizar os processos, execute: fix-port.bat
    echo.
) else (
    echo.
    echo ✅ Porta 4000 está livre!
    echo.
)

echo Pressione qualquer tecla para continuar...
pause >nul 
