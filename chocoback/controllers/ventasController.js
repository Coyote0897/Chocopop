const Venta = require('../models/ventas');
const Producto = require('../models/productos');

// Registrar una nueva venta
exports.registrarVenta = async (req, res, next) => {
    const { productos, metodoPago } = req.body;

    try {
        let total = 0;
        const productosVenta = []; 

        for (const item of productos) {
            const { codigo_de_barras, cantidad } = item;
            
            const producto = await Producto.findOne({ codigo_de_barras });
            if (!producto) {
                return res.status(404).json({ mensaje: `Producto con código de barras ${codigo_de_barras} no encontrado` });
            }

            const subtotal = producto.precio * cantidad;
            total += subtotal;

            productosVenta.push({
                producto: producto._id,
                cantidad
            });
        }

        // Ajustar la fecha a UTC-4
        const fechaVenta = new Date();
        fechaVenta.setHours(fechaVenta.getHours() - 4); 

        const nuevaVenta = new Venta({
            productos: productosVenta,
            total,
            metodoPago,
            fecha: fechaVenta 
        });

        await nuevaVenta.save();
        res.status(201).json({ mensaje: 'Venta registrada correctamente', venta: nuevaVenta });
    } catch (error) {
        console.error('Error al registrar la venta:', error);  
        res.status(500).json({ mensaje: 'Error al registrar la venta', error: error.message });
    }
};


// Obtener todas las ventas
exports.obtenerVentas = async (req, res, next) => {
    try {
        const ventas = await Venta.find().populate('productos.producto', 'nombre precio');
        res.status(200).json(ventas);
    } catch (error) {
        console.error('Error al obtener las ventas:', error);
        res.status(500).json({ mensaje: 'Error al obtener las ventas', error: error.message });
    }
};

// Obtener una venta específica por ID
exports.obtenerVenta = async (req, res, next) => {
    const { idVenta } = req.params;

    try {
        const venta = await Venta.findById(idVenta).populate('productos.producto', 'nombre precio');
        if (!venta) {
            return res.status(404).json({ mensaje: 'Venta no encontrada' });
        }
        res.status(200).json(venta);
    } catch (error) {
        console.error('Error al obtener la venta:', error);
        res.status(500).json({ mensaje: 'Error al obtener la venta', error: error.message });
    }
};

// Obtener producto de la base de datos por el código de barras
exports.obtenerProductoDeBD = async (req, res, next) => {
    const { codigo_de_barras } = req.params;

    try {
        const producto = await Producto.findOne({ codigo_de_barras });
        if (!producto) {
            return res.status(404).json({ mensaje: `Producto con código de barras ${codigo_de_barras} no encontrado` });
        }
        res.status(200).json(producto);
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ mensaje: 'Error al obtener el producto', error: error.message });
    }
};
// Eliminar una venta por ID
exports.eliminarVenta = async (req, res, next) => {
    const { idVenta } = req.params;

    try {
        const ventaEliminada = await Venta.findByIdAndDelete(idVenta);
        
        if (!ventaEliminada) {
            return res.status(404).json({ mensaje: 'Venta no encontrada' });
        }

        res.status(200).json({ mensaje: 'Venta eliminada correctamente', venta: ventaEliminada });
    } catch (error) {
        console.error('Error al eliminar la venta:', error);
        res.status(500).json({ mensaje: 'Error al eliminar la venta', error: error.message });
    }
};