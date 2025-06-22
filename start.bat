@echo off
chcp 65001 >nul
title TOKA-SYSTEM - Inicializador Automático

echo.
echo ========================================
echo    TOKA-SYSTEM - INICIALIZADOR
echo ========================================
echo.
echo Olá! Vou ajudar você a iniciar o projeto automaticamente.
echo.
echo Aguarde enquanto verifico e instalo as dependências...
echo.

:: Verificar se o Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Node.js não encontrado! Por favor, instale o Node.js primeiro.
    echo Download: https://nodejs.org/
    pause
    exit /b 1
)

:: Verificar se o npm está instalado
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] npm não encontrado! Por favor, instale o npm primeiro.
    pause
    exit /b 1
)

echo [✓] Node.js e npm encontrados!
echo.

:: Instalar dependências do frontend (se necessário)
if not exist "node_modules" (
    echo [1/3] Instalando dependências do frontend...
    npm install
    if %errorlevel% neq 0 (
        echo [ERRO] Falha ao instalar dependências do frontend!
        pause
        exit /b 1
    )
    echo [✓] Dependências do frontend instaladas!
) else (
    echo [✓] Dependências do frontend já instaladas!
)

:: Instalar dependências do backend (se necessário)
if not exist "src\api\node_modules" (
    echo [2/3] Instalando dependências do backend...
    cd src\api
    npm install
    if %errorlevel% neq 0 (
        echo [ERRO] Falha ao instalar dependências do backend!
        pause
        exit /b 1
    )
    cd ..\..
    echo [✓] Dependências do backend instaladas!
) else (
    echo [✓] Dependências do backend já instaladas!
)

echo.
echo [3/3] Iniciando o projeto...
echo.

:: Criar arquivo .env se não existir
if not exist "src\api\.env" (
    echo [INFO] Criando arquivo .env para o backend...
    echo PORT=3001 > src\api\.env
    echo MONGODB_URI=mongodb://localhost:27017/toka-system >> src\api\.env
    echo JWT_SECRET=your-secret-key-here >> src\api\.env
    echo [✓] Arquivo .env criado!
)

echo.
echo ========================================
echo    INICIANDO SERVIÇOS...
echo ========================================
echo.
echo Frontend: http://localhost:8080 (ou 8081)
echo Backend:  http://localhost:3001
echo.
echo Pressione Ctrl+C para parar todos os serviços
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
echo [INFO] Serviços iniciados com sucesso!
echo [INFO] Pressione qualquer tecla para fechar esta janela...
pause >nul
