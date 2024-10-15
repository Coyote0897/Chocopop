const jwt = require('jsonwebtoken');

// Clave secreta para firmar los tokens (puedes almacenarla en variables de entorno)
const SECRET_KEY = 'LLAVESECRETA';

// Función para generar un token de verificación
const generarToken = (payload, expiresIn = '1d') => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

// Función para verificar un token
const verificarToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        throw new Error('Token inválido');
    }
};

module.exports = {
    generarToken,
    verificarToken
};
