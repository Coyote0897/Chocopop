const mongoose = require('mongoose');

const ContactoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true, 
  },
  correo: {
    type: String,
    required: true,
    trim: true,
    lowercase: true, 
    match: [/\S+@\S+\.\S+/, 'Correo electrónico inválido'],
  },
  asunto: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100, 
  },
  mensaje: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000, 
  },
  creadoEn: {
    type: Date,
    default: Date.now, 
  },
});

const Contacto = mongoose.model('Contacto', ContactoSchema);

module.exports = Contacto;
