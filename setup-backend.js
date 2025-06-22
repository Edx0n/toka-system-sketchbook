#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

console.log('🚀 Configurando o Backend do Toka System...\n');

try {
  // Verificar se estamos na pasta correta
  if (!existsSync('src/api')) {
    console.error('❌ Pasta src/api não encontrada. Execute este script na raiz do projeto.');
    process.exit(1);
  }

  console.log('📦 Instalando dependências do backend...');
  execSync('npm run backend:install', { stdio: 'inherit' });

  console.log('\n✅ Backend configurado com sucesso!');
  console.log('\n📋 Próximos passos:');
  console.log('1. Instale o MongoDB localmente ou configure o MongoDB Atlas');
  console.log('2. Para MongoDB local: mongodb://localhost:27017/toka-system');
  console.log('3. Para MongoDB Atlas: Configure suas credenciais em src/api/config/local.js');
  console.log('\n🚀 Para iniciar o backend:');
  console.log('   npm run backend:dev');
  console.log('\n🌐 Para iniciar frontend e backend juntos:');
  console.log('   npm run full:dev');

} catch (error) {
  console.error('❌ Erro durante a configuração:', error.message);
  process.exit(1);
} 
