const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductosSchema = new Schema({
    nombre: {
        type: String,     
        trim: true,       
        required: true,   
        
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
    imagen:{
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Productos', ProductosSchema);



