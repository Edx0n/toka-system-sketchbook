import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  try {
    console.log('🔗 Tentando conectar ao MongoDB...');
    console.log('📍 URI:', config.mongoURI);
    
    const conn = await mongoose.connect(config.mongoURI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    
    // Se for erro de autenticação, sugerir usar MongoDB local
    if (error.message.includes('authentication failed')) {
      console.log('💡 Dica: Use MongoDB local ou configure suas credenciais no arquivo .env');
      console.log('💡 Para usar MongoDB local: mongodb://localhost:27017/toka-system');
    }
    
    process.exit(1);
  }
};

export default connectDB; 
