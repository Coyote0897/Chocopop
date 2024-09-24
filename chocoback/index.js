const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");
const usuarios = require('./models/usuarios');
const connectDB = require('./config/db');


const app = express();

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
