const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');


const app = express();

// Permitir múltiples orígenes
const whitelist = ['http://localhost:3000', 'http://localhost:3001']; // Agrega aquí ambos frontends

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Permitir la solicitud si el origen está en la whitelist
    } else {
      callback(new Error('Not allowed by CORS')); // Rechazar el origen si no está permitido
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Habilita el uso de cookies o credenciales
};

app.use(cors(corsOptions));


// Servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar a la base de datos
connectDB();

// Rutas de la aplicación
app.use('/', routes());

// Configuración del puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`El proyecto está corriendo en el puerto ${PORT}`);
});
