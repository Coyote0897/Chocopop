const Admin = require('../models/administrador');
const bcrypt = require('bcrypt');
const { admingenerarToken } = require('../helpers/token'); // Importar la función para manejar JWT

// Registrar un usuario (Administrador o Empleado)
exports.registrarUsuario = async (req, res, next) => {
  try {
    const { usuario, cargo, password } = req.body;

    if (cargo === 'Administrador') {
      const adminExists = await Admin.findOne({ cargo: 'Administrador' });
      if (adminExists) {
        return res.status(400).json({ error: 'Ya existe un administrador en el sistema.' });
      }
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el usuario
    const newUser = new Admin({
      usuario,
      cargo,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente.' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    next(error);
  }
};

// Autenticación de usuario
exports.autenticarUsuario = async (req, res, next) => {
  try {
    const { usuario, password } = req.body;

    const user = await Admin.findOne({ usuario });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta." });
    }
    console.log(`Usuario autenticado: ${usuario}, Cargo: ${user.cargo}`);

    const token = admingenerarToken({ id: user._id, cargo: user.cargo });

    res.status(200).json({
      message: "Autenticación exitosa.",
      token,
      cargo: user.cargo, 
    });
  } catch (error) {
    console.error("Error al autenticar usuario:", error);
    next(error);
  }
};

// Listar todos los usuarios
exports.listarUsuarios = async (req, res, next) => {
  try {
    const usuarios = await Admin.find({}, { password: 0 }); // Excluir la contraseña de la respuesta
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Error al listar usuarios:', error);
    next(error);
  }
};

// Editar un usuario
exports.editarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { usuario, cargo } = req.body;

    const usuarioExistente = await Admin.findOne({ _id: id });
    if (!usuarioExistente) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Verificar si ya existe un administrador si el cargo se cambia a "Administrador"
    if (cargo === 'Administrador' && usuarioExistente.cargo !== 'Administrador') {
      const adminExists = await Admin.findOne({ cargo: 'Administrador' });
      if (adminExists) {
        return res.status(400).json({ error: 'Ya existe un administrador en el sistema.' });
      }
    }

    usuarioExistente.usuario = usuario || usuarioExistente.usuario;
    usuarioExistente.cargo = cargo || usuarioExistente.cargo;

    await usuarioExistente.save();

    res.status(200).json({ message: 'Usuario actualizado exitosamente.' });
  } catch (error) {
    console.error('Error al editar usuario:', error);
    next(error);
  }
};

// Eliminar un usuario
exports.eliminarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;

    const usuarioExistente = await Admin.findById(id);
    if (!usuarioExistente) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    await Admin.findByIdAndDelete(id);

    res.status(200).json({ message: 'Usuario eliminado exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    next(error);
  }
};



