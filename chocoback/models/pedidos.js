const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios', required: true },
    productos: [
        {
            productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Productos', required: true },
            nombre: { type: String, required: true },
            precio: { type: Number, required: true },
            cantidad: { type: Number, required: true },
            subtotal: { type: Number, required: true }
        }
    ],
    total: { type: Number, required: true },
    fecha: { type: Date, default: Date.now },
    estado: { type: String, default: 'Pendiente' },
    direccionDestinatario: { type: String, default: null },
    nombreDestinatario: { type: String, default: null },
    telefonoDestinatario: { type: String, default: null }
});

// Solución: Verificar si el modelo ya está registrado
module.exports = mongoose.models.Pedidos || mongoose.model('Pedidos', PedidoSchema);
