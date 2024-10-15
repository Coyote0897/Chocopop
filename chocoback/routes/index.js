const express = require('express');
const router = express.Router();
const usuarioController =  require('../controllers/usuarioController')
const productoController = require('../controllers/productoController')
const pedidosController = require('../controllers/pedidosController')


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



    //productos
    router.post('/productos',productoController.subirArchivo,productoController.nuevoProducto);
    router.get('/productos',productoController.obtenerProductos);
    router.get('/productos/:idProducto',productoController.obtenerProducto);
    router.put('/productos/:idProducto',productoController.subirArchivo,productoController.actualizarProducto);
    router.delete('/productos/:idProducto',productoController.eliminarProducto);

    //pedidos
    router.post('/pedidos',pedidosController.nuevoPedido);
    router.get('/pedidos',pedidosController.mostrarPedidos);
    router.get('/pedidos/:idPedido',pedidosController.mostrarPedido);
    router.put('/pedidos/:idPedido',pedidosController.actualizarPedido);
    router.delete('/pedidos/:idPedido',pedidosController.eliminarPedido);





    






    

    
    return router
}

