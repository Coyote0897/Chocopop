const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Leer el token desde el header
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "No hay token, permiso no válido" });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, "LLAVESECRETA"); // Usa la misma llave secreta que configuraste al generar el token
    req.usuario = decoded; // Adjuntar el usuario decodificado a la solicitud
    next(); // Pasar al siguiente middleware o controlador
  } catch (error) {
    console.error("Error al verificar el token:", error.message);
    res.status(401).json({ msg: "Token no válido o expirado" });
  }
};

module.exports = authMiddleware;
