// models/Usuarios.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema de usuario con los nuevos campos
const usuariosSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: false,
    trim: true
  },
  telefono: {
    type: String,
    required: true,
    trim: true
  },
  token: {
    type: String,
    default: '', 
  },
  confirmado: {
    type: Boolean,
    default: false, 
  },
}, {
  timestamps: true 
});

// Exportar el modelo de Usuario
module.exports = mongoose.model('Usuarios', usuariosSchema);
