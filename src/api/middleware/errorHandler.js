export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Erro de validação do Mongoose
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(error => error.message);
    return res.status(400).json({
      message: 'Erro de validação',
      errors
    });
  }

  // Erro de duplicação do Mongoose
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      message: `${field} já existe`,
      field
    });
  }

  // Erro de ObjectId inválido
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'ID inválido'
    });
  }

  // Erro JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: 'Token inválido'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      message: 'Token expirado'
    });
  }

  // Erro padrão
  res.status(500).json({
    message: 'Erro interno do servidor'
  });
};

export const notFound = (req, res) => {
  res.status(404).json({
    message: 'Rota não encontrada'
  });
}; 
