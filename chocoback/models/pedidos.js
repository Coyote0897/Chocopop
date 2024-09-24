const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PedidosSchema = new Schema({
    cliente: {
        type: Schema.ObjectId,
        ref: 'Usuarios'
    },
    pedido: [{
        producto:{
            type: Schema.ObjectId,
            ref: 'Productos'
        },
        cantidad: Number
    
    }],
    total: { type: Number, required: true },
    fechaPedido: { type: Date, default: Date.now },
    metodoPago: { 
        type: String, 
        enum: ['efectivo', 'tarjeta', 'QR'], 
        required: true 
    },
    facturaEmitida: { type: Boolean, default: false }
});


module.exports = mongoose.model('Pedidos', PedidosSchema);
