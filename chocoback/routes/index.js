const express = require('express');
const router = express.Router();
const usuarioController =  require('../controllers/usuarioController')
const productoController = require('../controllers/productoController')
const pedidosController = require('../controllers/pedidosController')


module.exports = function(){

    //creando nuevos clientes con post
    router.post('/usuarios', usuarioController.nuevoUsuario);
    //obtener usuario
    router.get('/usuarios', usuarioController.obtenerUsuarios);
    //muestra un usuario por ID
    router.get('/usuarios/:idUsuario', usuarioController.obtenerUsuario);
    //actualizar usuario
    router.put('/usuarios/:idUsuario', usuarioController.actualizarUsuario);
    //eliminar usuarios
    router.delete('/usuarios/:idUsuario', usuarioController.eliminarUsuario);


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

