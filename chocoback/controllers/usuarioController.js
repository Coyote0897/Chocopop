const Usuarios = require('../models/usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');

exports.registrarUsuario = async (req, res) =>{

    //leer los datos del Usuario
    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12);
    try {
        await usuario.save();
        res.json({mensaje : 'Usuario creado correctamente'})
    } catch (error) {
        console.log(error);
        res.json({mensaje:'Hubo un error'})
    }


}

exports.autenticarUsuario = async(req,res,next)=>{
    //buscar Usuario 
    const {email, password} = req.body;
    const Usuario = await Usuarios.findOne({ email });

    if(!Usuario){
        await res.status(401).json({mensaje: 'ese usuario no existe'});
    }
    else{
        if(!bcrypt.compareSync(password, Usuario.password)) {
            //si el password es incorrecto
            await res.status(401).json({mensaje: 'Password incorrecto'});
            next();
        }
        else {
            //Firmar token
            const token = jwt.sign({
                email: Usuario.email,
                nombre: Usuario.nombre,
                id: Usuario._id
            },
            'LLAVESECRETA',
            {
                expiresIn :'1h'
            });

            res.json({token});
        }

    }

}




