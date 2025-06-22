# 🚀 Como Iniciar o TOKA-SYSTEM

## Scripts de Inicialização Automática

Este projeto possui dois scripts `.bat` para facilitar a inicialização:

### 📋 `start.bat` - Inicialização Completa
**Use este script na primeira vez ou quando precisar reinstalar dependências.**

**O que ele faz:**
- ✅ Verifica se Node.js e npm estão instalados
- ✅ Instala dependências do frontend (se necessário)
- ✅ Instala dependências do backend (se necessário)
- ✅ Cria arquivo `.env` para o backend (se não existir)
- ✅ Inicia o backend em uma janela separada
- ✅ Inicia o frontend na janela principal

**Como usar:**
1. Dê duplo clique no arquivo `start.bat`
2. Aguarde a instalação das dependências
3. O projeto será iniciado automaticamente

### ⚡ `start-quick.bat` - Inicialização Rápida
**Use este script para iniciar rapidamente quando as dependências já estão instaladas.**

**O que ele faz:**
- ✅ Inicia o backend em uma janela separada
- ✅ Inicia o frontend na janela principal

**Como usar:**
1. Dê duplo clique no arquivo `start-quick.bat`
2. O projeto será iniciado imediatamente

## 🌐 URLs dos Serviços

Após a inicialização, você pode acessar:

- **Frontend:** http://localhost:8080 (ou 8081 se a porta 8080 estiver ocupada)
- **Backend:** http://localhost:3001

## 🔧 Requisitos

Antes de usar os scripts, certifique-se de ter instalado:

- **Node.js** (versão 16 ou superior)
- **npm** (vem com o Node.js)

### Como verificar se está tudo instalado:
```bash
node --version
npm --version
```

## 🛠️ Comandos Manuais (Alternativa)

Se preferir usar comandos manuais:

### 1. Instalar dependências:
```bash
# Frontend
npm install

# Backend
cd src/api
npm install
cd ../..
```

### 2. Iniciar o projeto:
```bash
# Terminal 1 - Backend
cd src/api
npm run dev

# Terminal 2 - Frontend
npm run dev
```

## 🚨 Solução de Problemas

### Erro: "Node.js não encontrado"
- Instale o Node.js em: https://nodejs.org/
- Reinicie o computador após a instalação

### Erro: "Porta já em uso"
- O Vite automaticamente tentará a próxima porta disponível
- Verifique as URLs no terminal

### Erro: "Módulo não encontrado"
- Execute o `start.bat` para reinstalar as dependências

### Backend não conecta
- Verifique se o MongoDB está rodando (se estiver usando)
- Verifique se o arquivo `.env` foi criado corretamente

## 📝 Notas

- O backend roda na porta **3001**
- O frontend roda na porta **8080** (ou 8081)
- Ambos os serviços devem estar rodando para o sistema funcionar
- Para parar os serviços, feche as janelas do terminal ou pressione `Ctrl+C`

![image](https://github.com/user-attachments/assets/e7ae3346-ba84-4196-b984-e36793412b2f)

