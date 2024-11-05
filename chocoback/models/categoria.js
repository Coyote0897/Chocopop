const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriaSchema = new Schema({
    nombre: {
        type: String,
        required: false,
        unique: true,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('Categoria', CategoriaSchema);
