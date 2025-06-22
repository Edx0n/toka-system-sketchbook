// Configurações para desenvolvimento local
export const localConfig = {
  port: 4000,
  // MongoDB Atlas - Cluster gratuito
  mongoURI: "mongodb+srv://teste:TnVkjxzzB3w6LOME@todoapp.8vabbvx.mongodb.net/auth-todo",
  jwtSecret: "toka_system_secret_key_2024",
  corsOrigin: "http://localhost:3000",
  nodeEnv: "development"
};

// Para usar MongoDB local, substitua a mongoURI por:
// mongoURI: "mongodb://localhost:27017/toka-system"

// Para usar seu próprio MongoDB Atlas, substitua por:
// mongoURI: "mongodb+srv://seu_usuario:sua_senha@seu_cluster.mongodb.net/toka-system?retryWrites=true&w=majority"
