const Usuarios = require('../models/usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');

exports.registrarUsuario = async (req, res) => {
    try {
        // Leer los datos del usuario desde el request
        const { nombre, email, password, direccion, telefono } = req.body;

        // Verificar si el usuario ya existe
        let usuario = await Usuarios.findOne({ email });
        if (usuario) {
            return res.status(400).json({ mensaje: 'El usuario ya existe' });
        }

        // Crear nuevo usuario
        usuario = new Usuarios({
            nombre,
            email,
            password: await bcrypt.hash(password, 12),
            direccion,
            telefono
        });

        // Guardar el usuario en la base de datos
        await usuario.save();

        res.json({ mensaje: 'Usuario creado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Hubo un error al registrar el usuario' });
    }
};

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




