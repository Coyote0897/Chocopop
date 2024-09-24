const Usuarios = require('../models/usuarios.js')

//agregar nuevo cliente
exports.nuevoUsuario = async (req, res,next) =>{
   
    const usuario = new Usuarios(req.body);

    try {
        await usuario.save();
        res.json({mensaje: 'se agrego un usuario'});
        
    } catch (error) {
        console.log(error);
        next();
        
    }
}
exports.obtenerUsuarios = async (req, res, next) => {
    try {
        const usuarios = await Usuarios.find();
        res.json(usuarios);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
exports.obtenerUsuario = async (req, res, next)=>{
    const usuario = await Usuarios.findById(req.params.idUsuario)

    if(!usuario){
        res.json({mensaje: 'el usuario no existe'})
    }
    //motrar usuario
    res.json(usuario)
}
//actualiza un usuario
exports.actualizarUsuario = async (req,res,next) => {
    try {
        const usuario = await Usuarios.findOneAndUpdate({_id : req.params.idUsuario},
             req.body,{
                new: true
            }
        );
        res.json(usuario);

    } catch (error) {
        console.log(error);
        next();
    }

    

}

exports.eliminarUsuario = async (req, res, next) => {
    try {
        await Usuarios.findByIdAndDelete({_id : req.params.idUsuario});
        res.json({mensaje: 'el usuario ha sido eliminado'})
        
    } catch (error) {
        console.log(error);
        next(error);
    }
};




