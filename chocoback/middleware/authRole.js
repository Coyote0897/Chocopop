const jwt = require('jsonwebtoken');

const authRole = (role) => {
  return (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.cargo !== role) {
        return res.status(403).json({ error: 'No tienes permisos para acceder a esta ruta.' });
      }

      req.user = decoded; // Decodificar el usuario en la request
      next();
    } catch (error) {
      res.status(401).json({ error: 'Autorización no válida.' });
    }
  };
};

module.exports = authRole;
