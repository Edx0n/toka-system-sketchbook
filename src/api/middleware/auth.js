import jwt from "jsonwebtoken";
import User from "../models/User.js";

const secret = "secret123";

export const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const payload = jwt.verify(token, secret);
    const user = await User.findById(payload.id);
    
    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Erro na autenticação:", error);
    return res.status(401).json({ message: "Token inválido" });
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if (token) {
      const payload = jwt.verify(token, secret);
      const user = await User.findById(payload.id);
      if (user) {
        req.user = user;
      }
    }
    
    next();
  } catch (error) {
    // Se houver erro na autenticação, continua sem usuário
    next();
  }
}; 
