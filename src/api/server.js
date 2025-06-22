import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/database.js";
import config from "./config/config.js";
import authRoutes from "./routes/auth.js";
import itemRoutes from "./routes/items.js";
import maintenanceRoutes from "./routes/maintenance.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

// Conectar ao banco de dados
await connectDB();

const app = express();

// Middlewares
app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// CORS
app.use(
  cors({
    credentials: true,
    origin: config.corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rotas
app.get("/", (req, res) => {
  res.json({ 
    message: "Toka System API - Oficina de Motos", 
    version: "2.0.0",
    status: "running",
    features: [
      "Autenticação de usuários",
      "Gerenciamento de estoque",
      "Controle de manutenções",
      "Gestão de clientes",
      "Relatórios e estatísticas"
    ]
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: "Connected"
  });
});

// Rotas de autenticação
app.use("/auth", authRoutes);

// Rotas de itens/estoque
app.use("/items", itemRoutes);

// Rotas de manutenções
app.use("/maintenance", maintenanceRoutes);

// Middleware de tratamento de erros
app.use(notFound);
app.use(errorHandler);

// Iniciar servidor
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`🚀 Toka System API rodando na porta ${PORT}`);
  console.log(`📊 Ambiente: ${config.nodeEnv}`);
  console.log(`🌐 CORS Origin: ${config.corsOrigin}`);
  console.log(`🔗 API URL: http://localhost:${PORT}`);
  console.log(`🏍️  Sistema: Oficina de Motos`);
});

// Tratamento de erros não capturados
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
