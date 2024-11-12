const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Modelo de Ventas
const VentaSchema = new Schema({
    productos: [{
        producto: {
            type: Schema.Types.ObjectId,
            ref: 'Productos',
            required: true
        },
        cantidad: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    total: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    metodoPago: {
        type: String,
        enum: ['efectivo', 'tarjeta', 'transferencia'],
        required: false
    }
});

module.exports = mongoose.model('Venta', VentaSchema);