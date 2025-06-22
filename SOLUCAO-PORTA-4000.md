# 🔧 Solução para Erro de Porta 4000 em Uso

## Problema
O erro `EADDRINUSE: address already in use :::4000` indica que a porta 4000 já está sendo usada por outro processo.

## Soluções Disponíveis

### 1. Script Automático (Recomendado)
Execute o arquivo `fix-port.bat` que irá:
- Identificar processos na porta 4000
- Finalizar automaticamente esses processos
- Iniciar o servidor backend

```bash
fix-port.bat
```

### 2. Verificar Porta Manualmente
Execute `check-port.bat` para ver quais processos estão usando a porta 4000:

```bash
check-port.bat
```

### 3. Solução Manual via Comando
Se preferir resolver manualmente:

```bash
# Verificar processos na porta 4000
netstat -aon | findstr :4000

# Finalizar processo específico (substitua XXXX pelo PID)
taskkill /f /pid XXXX
```

### 4. Usar Script Melhorado
O arquivo `start-quick.bat` foi atualizado para incluir verificação automática de porta.

## Prevenção
- Sempre feche o terminal do backend antes de iniciar novamente
- Use `Ctrl+C` para parar o servidor adequadamente
- Evite executar múltiplas instâncias do servidor

## Arquivos Criados
- `fix-port.bat` - Script para resolver automaticamente
- `check-port.bat` - Script para verificar porta
- `start-quick.bat` - Script atualizado com verificação de porta

## Estrutura de Pastas
```
toka-system-sketchbook/
├── fix-port.bat          # Resolver problema de porta
├── check-port.bat        # Verificar porta
├── start-quick.bat       # Inicialização com verificação
└── src/api/
    └── server.js         # Servidor backend (porta 4000)
``` 
