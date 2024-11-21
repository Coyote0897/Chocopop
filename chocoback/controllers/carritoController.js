const Carrito = require('../models/carrito');
const Productos = require('../models/productos');
const Pedidos = require('../models/pedidos');

const { enviarEmailConQR } = require('../helpers/emails');



// Añadir producto al carrito
exports.agregarProducto = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const { productoId, cantidad } = req.body;

        const producto = await Productos.findById(productoId);
        if (!producto) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }

        let carrito = await Carrito.findOne({ usuario: usuarioId });
        if (!carrito) {
            carrito = new Carrito({
                usuario: usuarioId,
                productos: [],
                descuento: 0,
                total: 0
            });
        }

        const productoExistente = carrito.productos.find(
            (item) => item.productoId.toString() === productoId
        );

        if (productoExistente) {
            productoExistente.cantidad += cantidad;
            productoExistente.subtotal = productoExistente.cantidad * producto.precio;
        } else {
            carrito.productos.push({
                productoId: producto._id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad,
                subtotal: producto.precio * cantidad
            });
        }

        carrito.total = carrito.productos.reduce((acc, item) => acc + item.subtotal, 0);
        await carrito.save();

        res.status(200).json({ msg: 'Producto añadido al carrito', carrito });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al añadir producto al carrito' });
    }
};

// Obtener el carrito del usuario
exports.obtenerCarrito = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;

        const carrito = await Carrito.findOne({ usuario: usuarioId });
        if (!carrito) {
            return res.status(404).json({ msg: 'Carrito no encontrado' });
        }

        res.status(200).json(carrito);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el carrito' });
    }
};

// Actualizar la cantidad de un producto en el carrito
exports.actualizarCantidad = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const { productoId, cantidad } = req.body;

        const carrito = await Carrito.findOne({ usuario: usuarioId });
        if (!carrito) {
            return res.status(404).json({ msg: 'Carrito no encontrado' });
        }

        const producto = carrito.productos.find(
            (item) => item.productoId.toString() === productoId
        );

        if (!producto) {
            return res.status(404).json({ msg: 'Producto no encontrado en el carrito' });
        }

        producto.cantidad = cantidad;
        producto.subtotal = producto.cantidad * producto.precio;
        carrito.total = carrito.productos.reduce((acc, item) => acc + item.subtotal, 0);

        await carrito.save();
        res.status(200).json({ msg: 'Cantidad actualizada', carrito });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar la cantidad' });
    }
};

// Eliminar un producto del carrito
exports.eliminarProducto = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const { productoId } = req.body;

        const carrito = await Carrito.findOne({ usuario: usuarioId });
        if (!carrito) {
            return res.status(404).json({ msg: 'Carrito no encontrado' });
        }

        carrito.productos = carrito.productos.filter(
            (item) => item.productoId.toString() !== productoId
        );
        carrito.total = carrito.productos.reduce((acc, item) => acc + item.subtotal, 0);

        await carrito.save();
        res.status(200).json({ msg: 'Producto eliminado del carrito', carrito });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el producto del carrito' });
    }
};

// Vaciar el carrito
exports.vaciarCarrito = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;

        const carrito = await Carrito.findOne({ usuario: usuarioId });
        if (!carrito) {
            return res.status(404).json({ msg: 'Carrito no encontrado' });
        }

        carrito.productos = [];
        carrito.total = 0;

        await carrito.save();
        res.status(200).json({ msg: 'Carrito vaciado', carrito });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al vaciar el carrito' });
    }
};

// Confirmar compra y mover datos a la colección de pedidos
exports.confirmarCompra = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;

        // Obtener el carrito del usuario
        const carrito = await Carrito.findOne({ usuario: usuarioId });
        if (!carrito || carrito.productos.length === 0) {
            return res.status(400).json({ msg: 'El carrito está vacío' });
        }

        // Crear un nuevo pedido con los datos del carrito
        const { direccionDestinatario, nombreDestinatario, telefonoDestinatario } = req.body;
        const usuarioEmail = req.usuario.email;

        const nuevoPedido = new Pedidos({
            usuario: usuarioId,
            productos: carrito.productos,
            total: carrito.total,
            fecha: new Date(),
            estado: 'Pendiente',
            direccionDestinatario: direccionDestinatario || req.usuario.direccion,
            nombreDestinatario: nombreDestinatario || req.usuario.nombre,
            telefonoDestinatario: telefonoDestinatario || req.usuario.telefono,
        });

        await nuevoPedido.save();

        // Vaciar el carrito
        carrito.productos = [];
        carrito.total = 0;
        await carrito.save();

        // Enviar el correo con el QR adjunto
        const qrFileName = 'nombre_del_qr.jpeg'; // Reemplaza con el nombre real del archivo en `uploads`
        await enviarEmailConQR(usuarioEmail, nombreDestinatario || req.usuario.nombre, qrFileName);

        res.status(200).json({ msg: 'Compra confirmada y correo enviado', pedido: nuevoPedido });
    } catch (error) {
        console.error("Error en confirmarCompra:", error);
        res.status(500).json({ msg: 'Error al confirmar la compra' });
    }
};

// Obtener datos del usuario autenticado
exports.obtenerDatosUsuario = async (req, res) => {
    try {
        const usuarioId = req.usuario.id; // Asegúrate de que `req.usuario` contenga el ID del usuario
        const usuario = await Usuario.findById(usuarioId);

        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        
        res.status(200).json({
            nombre: usuario.nombre,
            direccion: usuario.direccion,
            telefono: usuario.telefono,
        });
    } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
        res.status(500).json({ msg: 'Error al obtener datos del usuario' });
    }
};