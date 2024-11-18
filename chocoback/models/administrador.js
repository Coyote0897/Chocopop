const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  cargo: {
    type: String,
    required: true,
    enum: ['Administrador', 'Empleado'],
    default: 'Empleado'
  },
  password: {
    type: String,
    required: true
  }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
