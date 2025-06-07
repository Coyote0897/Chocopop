const Usuarios = require('../models/usuarios');
const bcrypt = require('bcryptjs');

//helpers
const { enviarEmailVerificacion } = require('../helpers/emails');
const { enviarEmailRecuperacion } = require('../helpers/emails');
const { generarToken, verificarToken } = require('../helpers/token'); 

const validarDireccion = (direccion) => {
    return typeof direccion === 'string' && direccion.trim() !== '';
};

const validarTelefono = (telefono) => {
    return /^\d{7,10}$/.test(telefono);
};

exports.registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, password, direccion, telefono } = req.body;

        if (!validarDireccion(direccion)) {
            return res.status(400).json({ mensaje: 'La dirección no es válida' });
        }
        
        if (!validarTelefono(telefono)) {
            return res.status(400).json({ mensaje: 'El número de teléfono no es válido' });
        }

        // Verificar si el usuario ya existe
        let usuario = await Usuarios.findOne({ email });
        if (usuario) {
            return res.status(400).json({ mensaje: 'El usuario ya existe' });
        }

        // Generar un token de verificación
        const verificationToken = generarToken({ email });

        // Crear nuevo usuario
        usuario = new Usuarios({
            nombre,
            email,
            password: await bcrypt.hash(password, 12),
            direccion,
            telefono,
            token: verificationToken, 
            confirmado: false 
        });

        // Guardar el usuario en la base de datos
        await usuario.save();

        // Enviar el correo de verificación
        await enviarEmailVerificacion(email, nombre, verificationToken);

        res.json({ mensaje: 'Usuario creado correctamente. Revisa tu correo para verificar tu cuenta.' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Hubo un error al registrar el usuario' });
    }
};

exports.verificarCuenta = async (req, res) => {
    const { token } = req.params;
    console.log('Token recibido:', token);

    try {
        // Verificar el token
        const decoded = verificarToken(token);
        const usuario = await Usuarios.findOne({ email: decoded.email });

        if (!usuario) {
            return res.status(400).json({ mensaje: 'Token inválido o usuario no encontrado' });
        }

        // Verificar si el usuario ya está confirmado
        if (usuario.confirmado) {
            return res.status(400).json({ mensaje: 'Esta cuenta ya ha sido verificada' });
        }

        // Actualizar el estado de verificación
        usuario.confirmado = true;
        usuario.token = '';
        await usuario.save();

        res.json({ mensaje: 'Cuenta verificada correctamente. Ahora puedes iniciar sesión.' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje: 'Error al verificar la cuenta' });
    }
};

exports.autenticarUsuario = async (req, res, next) => {
    const { email, password } = req.body;
    const usuario = await Usuarios.findOne({ email });

    // Verificar si el usuario existe
    if (!usuario) {
        return res.status(401).json({ mensaje: 'Ese usuario no existe' });
    }

    // Verificar si la cuenta ha sido confirmada
    if (!usuario.confirmado) {
        return res.status(403).json({ mensaje: 'Debes verificar tu cuenta antes de iniciar sesión' });
    }

    // Verificar el password
    if (!bcrypt.compareSync(password, usuario.password)) {
        return res.status(401).json({ mensaje: 'Password incorrecto' });
    }

    // Firmar token
    const token = generarToken({
        email: usuario.email,
        nombre: usuario.nombre,
        id: usuario._id
    }, '1h');

    res.json({ token });
};


//recuperar contraseña 
exports.solicitarRecuperacionPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Buscar el usuario por su email
        const usuario = await Usuarios.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ mensaje: 'El usuario no existe' });
        }

        // Generar un token de recuperación
        const resetToken = generarToken({ email }, '1h'); // Expira en 1 hora

        // Guardar el token temporalmente en la base de datos
        usuario.token = resetToken;
        await usuario.save();

        // Enviar el correo de recuperación
        await enviarEmailRecuperacion(email, usuario.nombre, resetToken);

        res.json({ mensaje: 'Hemos enviado un enlace a tu correo para recuperar tu contraseña' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Hubo un error al procesar la solicitud' });
    }
};

exports.actualizarPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        // Verificar el token
        const decoded = verificarToken(token);
        const usuario = await Usuarios.findOne({ email: decoded.email });

        if (!usuario) {
            return res.status(400).json({ mensaje: 'Token inválido o usuario no encontrado' });
        }

        // Actualizar la contraseña
        usuario.password = await bcrypt.hash(password, 12);
        usuario.token = ''; // Limpiar el token después de usarlo
        await usuario.save();

        res.json({ mensaje: 'Contraseña actualizada correctamente. Ahora puedes iniciar sesión.' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje: 'Hubo un error al actualizar la contraseña' });
    }
};

// Ver información de los usuarios
exports.verUsuarios = async (req, res) => {
    try {
        // Buscar todos los usuarios y seleccionar solo los campos necesarios
        const usuarios = await Usuarios.find({}, 'nombre email direccion telefono confirmado');
        
        // Enviar la lista de usuarios en la respuesta
        res.json(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Hubo un error al obtener la información de los usuarios' });
    }
};



