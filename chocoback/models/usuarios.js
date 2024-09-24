const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsuariosSchema = new Schema({
  nombre: {
      type: String,
      required: true,
      trim: true
  },
  email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
  },
  password: {
      type: String,
      required: true
  },
  direccion: {
      type: String,
      required: true,
      trim: true
  },
  telefono: {
      type: String,
      required: true,
      trim: true
  }
 
});
  
  module.exports = mongoose.model('Usuarios', UsuariosSchema);