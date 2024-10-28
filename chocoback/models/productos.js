const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductosSchema = new Schema({
    
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    descripcion: {
        type: String,
        trim: true,
        maxlength: 500
    },
    categoria: {
        type: String,
        required: true
    },
    codigo_de_barras: {
        type: String, 
        unique: true, 
        required: true },
    imagen: {
        type: String  
    },
    ingredientes: {
        type: String, // Guardaremos los ingredientes como texto largo
        trim: true,
        default: 'Ingredientes no disponibles'
    },
    pais: {
        type: String,
        default: 'No especificado'
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Productos', ProductosSchema);
