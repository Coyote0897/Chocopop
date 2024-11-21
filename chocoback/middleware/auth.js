const jwt = require('jsonwebtoken');
const SECRET_KEY = 'LLAVESECRETA';

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ mensaje: 'No autorizado, no hay JWT' });
  }

  const token = authHeader.split(' ')[1]; // Elimina "Bearer" del token
  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.usuario = decoded; // Agrega el usuario decodificado a la request
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido' });
  }
};

module.exports = authMiddleware;
