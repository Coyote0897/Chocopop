const jwt = require('jsonwebtoken');

const SECRET_KEY = 'LLAVESECRETA';

const generarToken = (payload, expiresIn = '1d') => {
    return jwt.sign({ ...payload, timestamp: Date.now() }, SECRET_KEY, { expiresIn });
};

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
