import dotenv from 'dotenv';
import { localConfig } from './local.js';

dotenv.config();

const config = {
  port: process.env.PORT || localConfig.port,
  mongoURI: process.env.MONGO_URI || localConfig.mongoURI,
  jwtSecret: process.env.JWT_SECRET || localConfig.jwtSecret,
  corsOrigin: process.env.CORS_ORIGIN || localConfig.corsOrigin,
  nodeEnv: process.env.NODE_ENV || localConfig.nodeEnv
};

// Log para debug
console.log('🔧 Configuração carregada:', {
  port: config.port,
  mongoURI: config.mongoURI ? 'MongoDB configurado' : 'MongoDB não configurado',
  nodeEnv: config.nodeEnv
});

export default config; 
