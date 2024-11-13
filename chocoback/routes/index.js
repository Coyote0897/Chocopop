const express = require('express');
const router = express.Router();
const usuarioController =  require('../controllers/usuarioController')
const productoController = require('../controllers/productoController')
const pedidosController = require('../controllers/pedidosController')
const categoriaController = require('../controllers/categoriaController');
const ventasController = require('../controllers/ventasController');
const reportController = require('../controllers/reportController');


//middleware para proteger las rutas
//const auth = require('../middleware/auth')


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
    router.post('/pedidos',pedidosController.nuevoPedido);
    router.get('/pedidos',pedidosController.mostrarPedidos);
    router.get('/pedidos/:idPedido',pedidosController.mostrarPedido);
    router.put('/pedidos/:idPedido',pedidosController.actualizarPedido);
    router.delete('/pedidos/:idPedido',pedidosController.eliminarPedido);

    //ventas
    router.post('/ventas', ventasController.registrarVenta);
    router.get('/ventas', ventasController.obtenerVentas);    
    router.get('/ventas/:idVenta',ventasController.obtenerVenta); 

    router.get('/ventas/codigo/:codigo_de_barras', ventasController.obtenerProductoDeBD);



    //reportes
    router.get('/reportes/productos-por-categoria', reportController.getProductosPorCategoria);
    // Ruta para obtener ventas por día del mes
    router.get('/reportes/ventas-por-dia', reportController.obtenerVentasPorDiaDelMes );





    return router
}

