const Pedido = require('../models/pedidos');
const { 
    enviarEmailPedidoEnCamino, 
    enviarEmailPedidoEntregado 
} = require('../helpers/emails'); 

// Obtener todos los pedidos
const obtenerPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find()
            .populate('usuario', 'nombre email') // Incluye información básica del usuario
            .populate('productos.productoId', 'nombre precio'); // Incluye información de los productos
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los pedidos', error });
    }
};

// Actualizar el estado de un pedido
const actualizarEstadoPedido = async (req, res) => {
    const { id } = req.params; // ID del pedido
    const { estado } = req.body; // Nuevo estado

    try {
        const pedido = await Pedido.findByIdAndUpdate(
            id,
            { estado },
            { new: true } 
        ).populate('usuario');

        if (!pedido) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }

        const cliente = pedido.usuario;

        // Enviar correos según el nuevo estado
        if (estado === 'Enviado' && cliente && cliente.email) {
            await enviarEmailPedidoEnCamino(
                cliente.email,
                cliente.nombre,
                pedido.productos,
                pedido.total
            );
        } else if (estado === 'Entregado' && cliente && cliente.email) {
            await enviarEmailPedidoEntregado(cliente.email, cliente.nombre);
        }

        res.status(200).json({ mensaje: 'Estado del pedido actualizado', pedido });
    } catch (error) {
        console.error('Error al actualizar el estado del pedido:', error);
        res.status(500).json({ mensaje: 'Error al actualizar el estado del pedido', error });
    }
};


module.exports = {
    obtenerPedidos,
    actualizarEstadoPedido
};
