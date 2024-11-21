const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarritoSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
    productos: [
        {
            productoId: {
                type: Schema.Types.ObjectId,
                ref: 'Productos',
                required: true
            },
            nombre: {
                type: String,
                required: true,
                trim: true
            },
            precio: {
                type: Number,
                required: true,
                min: 0
            },
            cantidad: {
                type: Number,
                required: true,
                min: 1
            },
            subtotal: {
                type: Number,
                required: true,
                min: 0
            }
        }
    ],
    descuento: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Carrito', CarritoSchema);
