const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");
const usuarios = require('./models/usuarios');
const connectDB = require('./config/db');
const cors = require('cors');



const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Reemplaza con la URL de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Habilita el uso de cookies en solicitudes CORS si es necesario
}));

// habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// conexión con Atlas
connectDB();

// rutas de la app
app.use('/', routes());

// puerto
const PORT = process.env.PORT; 
app.listen(PORT, () => {
  console.log(`El proyecto está corriendo en el puerto ${PORT}`);
});
