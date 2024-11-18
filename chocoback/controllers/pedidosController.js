const pedidos = require('../models/pedidos');
const Usuarios = require('../models/pedidos');
const { find } = require('../models/usuarios');


//agregar un nuevo pedido
exports.nuevoPedido = async(req,res,next) =>{

    const pedido = new pedidos(req.body);

    try {
        await pedido.save();
        res.json({mensaje: 'se agrego un nuevo pedido'})
        
    } catch (error) {
        console.log(error)
        next(error)
    }

}
// mostrar pedidos 
exports.mostrarPedidos = async (req,res,next)=>{
    try {
        const pedido = await pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
    res.json(pedido);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

//buscar un pedido 
exports.mostrarPedido = async(req,res,next) => {
        const pedido = await pedidos.findById(req.params.idPedido).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        if(!pedido){
            res.json({mensaje: 'el pedido no existe'})
            return next();
        }
        res.json(pedido)

    
}

//Actualizar Pedido
exports.actualizarPedido = async (req,res,next) =>{
    try {
        let pedido = await pedidos.findByIdAndUpdate({_id : req.params.idPedido},req.body,{
            new: true
        }).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json({mensaje:'actualizado'})
    } catch (error) {
        console.log(error);
        next();
    }
}

//eliminar Pedido
exports.eliminarPedido = async(req,res,next)=>{
    try {
        await pedidos.findByIdAndDelete({_id : req.params.idPedido});
        res.json({mensaje:'pedido eliminado'})
    } catch (error) {
        console.log(error);
        next();
    }
}