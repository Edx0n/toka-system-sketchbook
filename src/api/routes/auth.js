import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const secret = "secret123";

// Middleware para validar dados de entrada
const validateUserData = (req, res, next) => {
  const { email, password, name } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ message: "Senha deve ter pelo menos 6 caracteres" });
  }
  
  if (req.path === '/register' && !name) {
    return res.status(400).json({ message: "Nome é obrigatório" });
  }
  
  next();
};

// GET /auth/user - Obter dados do usuário atual
router.get("/user", async (req, res) => {
  try {
    if (!req.cookies.token) {
      return res.json({});
    }
    
    const payload = jwt.verify(req.cookies.token, secret);
    const userInfo = await User.findById(payload.id).select('-password');
    
    if (!userInfo) {
      return res.json({});
    }
    
    res.json({ 
      id: userInfo._id, 
      email: userInfo.email, 
      name: userInfo.name,
      avatar: userInfo.avatar,
      preferences: userInfo.preferences
    });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// POST /auth/register - Registrar novo usuário
router.post("/register", validateUserData, async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }
    
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({ 
      password: hashedPassword, 
      email, 
      name 
    });
    
    const userInfo = await user.save();
    
    jwt.sign(
      { id: userInfo._id, email: userInfo.email },
      secret,
      (err, token) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Erro ao gerar token" });
        }
        
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
        }).json({ 
          id: userInfo._id, 
          email: userInfo.email,
          name: userInfo.name
        });
      }
    );
  } catch (error) {
    console.error("Erro no registro:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// POST /auth/login - Login do usuário
router.post("/login", validateUserData, async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const userInfo = await User.findOne({ email });
    if (!userInfo) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }
    
    const passOk = bcrypt.compareSync(password, userInfo.password);
    if (!passOk) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }
    
    // Atualizar último login
    userInfo.lastLogin = new Date();
    await userInfo.save();
    
    jwt.sign({ id: userInfo._id, email }, secret, (err, token) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Erro ao gerar token" });
      }
      
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
      }).json({ 
        id: userInfo._id, 
        email: userInfo.email,
        name: userInfo.name
      });
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// POST /auth/logout - Logout do usuário
router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logout realizado com sucesso" });
});

// PUT /auth/profile - Atualizar perfil do usuário
router.put("/profile", async (req, res) => {
  try {
    if (!req.cookies.token) {
      return res.status(401).json({ message: "Não autorizado" });
    }
    
    const payload = jwt.verify(req.cookies.token, secret);
    const { name, avatar, preferences } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (avatar !== undefined) updateData.avatar = avatar;
    if (preferences) updateData.preferences = preferences;
    
    const user = await User.findByIdAndUpdate(
      payload.id,
      updateData,
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

export default router; 
