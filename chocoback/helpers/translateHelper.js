const axios = require('axios');

// Función para traducir texto usando Google Translate API
const traducirTexto = async (texto, target = 'es') => {
    const apiKey = 'AIzaSyBX45edik3Jzc6hRcgsIDgEDfYsHehZ6L0'; 
    const url = `https://translation.googleapis.com/language/translate/v2`;

    try {
        const response = await axios.post(
            url,
            { q: texto, target: target, format: 'text' },
            { params: { key: apiKey } }
        );

        return response.data.data.translations[0].translatedText;
    } catch (error) {
        console.error('Error en la traducción:', error.message);
        return texto; 
    }
};

module.exports = { traducirTexto };
