const express = require('express');
const router = express.Router();
const usuarioController =  require('../controllers/usuarioController')
const productoController = require('../controllers/productoController')
const pedidosController = require('../controllers/pedidosController')
const categoriaController = require('../controllers/categoriaController');
const ventasController = require('../controllers/ventasController');
const reportController = require('../controllers/reportController');
const administradorController = require('../controllers/administradorController');
const contactoController = require('../controllers/contactoController'); 
const carritoController = require('../controllers/carritoController');


//middleware para proteger las rutas
const authMiddleware = require('../middleware/auth');

const authRole = require('../middleware/authRole');



module.exports = function(){
    //usuarios
    router.post('/crear-cuenta', usuarioController.registrarUsuario );
    router.post('/iniciar-sesion', usuarioController.autenticarUsuario);
    //verificarcuenta
    router.get('/verificar/:token', usuarioController.verificarCuenta);
    //recuperar password
    router.post('/recuperar-password', usuarioController.solicitarRecuperacionPassword);
    router.post('/recuperar-password/:token', usuarioController.actualizarPassword);
    router.get('/usuarios', usuarioController.verUsuarios);

   
    //productos
    router.post('/productos',productoController.subirArchivo,productoController.nuevoProducto);
    router.get('/productos',productoController.obtenerProductos);
    router.put('/productos/:idProducto',productoController.subirArchivo,productoController.actualizarProducto);
    //obtencion por codigo de barras
    router.get('/productos/codigo/:codigo', productoController.obtenerProductoPorCodigo);
    //agregar el precio y la categoria
    router.put('/productos/:idProducto/precio-categoria', productoController.actualizarPrecioYCategoria);
    

    // Ruta para obtener productos por nombre de categoría
    router.get('/productos/categoria/nombre/:nombreCategoria', productoController.obtenerProductosPorNombreCategoria);

    

     // Categorías
     router.post('/categorias', categoriaController.nuevaCategoria);
     router.get('/categorias', categoriaController.obtenerCategorias);
     router.get('/categorias/:idCategoria', categoriaController.obtenerCategoria);
     router.put('/categorias/:idCategoria', categoriaController.actualizarCategoria);
     router.delete('/categorias/:idCategoria', categoriaController.eliminarCategoria);
     

    router.get('/productos/:idProducto',productoController.obtenerProducto);
    router.delete('/productos/:idProducto',productoController.eliminarProducto);
   

    //pedidos
    router.get('/pedidos', pedidosController.obtenerPedidos); 
    router.put('/pedidos/:id', pedidosController.actualizarEstadoPedido);




    //ventas
    router.post('/ventas', ventasController.registrarVenta);
    router.get('/ventas', ventasController.obtenerVentas);    
    router.get('/ventas/:idVenta',ventasController.obtenerVenta); 
    router.get('/ventas/codigo/:codigo_de_barras', ventasController.obtenerProductoDeBD);
    router.delete('/ventas/:idVenta', ventasController.eliminarVenta);
    


    //reportes
    router.get('/reportes/productos-por-categoria', reportController.getProductosPorCategoria);
    // Ruta para obtener ventas por día del mes
    router.get('/reportes/ventas-por-dia', reportController.obtenerVentasPorDiaDelMes );
    //metodos de pago
    router.get('/reportes/ventas-por-metodo-pago', reportController.obtenerVentasPorMetodoPago);

    //administrador 
    router.post('/admin/crear-cuenta', administradorController.registrarUsuario); 
    router.post('/admin/iniciar-sesion', administradorController.autenticarUsuario);
    router.get('/admin/listar-usuarios', administradorController.listarUsuarios);
    router.put('/admin/editar-usuario/:id', administradorController.editarUsuario);
    router.delete('/admin/eliminar-usuario/:id', administradorController.eliminarUsuario);


    //contacto
    router.post('/contactos', contactoController.crearContacto);
    router.get('/contactos', contactoController.obtenerContactos); 
    router.get('/contactos/:id', contactoController.obtenerContactoPorId);
    router.delete('/contactos/:id', contactoController.eliminarContacto); 
    router.post('/contactos/:id/responder', contactoController.responderContacto);


    //carrito
    router.post('/carrito', authMiddleware, carritoController.agregarProducto);
    router.get('/carrito', authMiddleware, carritoController.obtenerCarrito);
    router.put('/carrito', authMiddleware, carritoController.actualizarCantidad);
    router.delete('/carrito', authMiddleware, carritoController.eliminarProducto);
    router.post('/carrito/confirmar-compra', authMiddleware, carritoController.confirmarCompra);
    

    
    return router
}

