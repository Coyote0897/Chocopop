const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

// Función para conectar a MongoDB Atlas
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Conexión exitosa a MongoDB Atlas ✔️");
  } catch (error) {
    console.error("Error al conectar con MongoDB Atlas ❌", error);
    process.exit(1); // Termina la app si falla la conexión
  }
};

module.exports = connectDB;
