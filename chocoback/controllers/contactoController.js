const Contacto = require('../models/contact');
const { enviarEmailRespuesta } = require('../helpers/emails');

// Crear un nuevo contacto
exports.crearContacto = async (req, res) => {
  try {
    const { nombre, correo, asunto, mensaje } = req.body;

    if (!nombre || !correo || !asunto || !mensaje) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }
    const nuevoContacto = new Contacto({ nombre, correo, asunto, mensaje });
    await nuevoContacto.save();

    res.status(201).json({ mensaje: 'Contacto creado exitosamente', contacto: nuevoContacto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el contacto' });
  }
};

// Obtener todos los contactos
exports.obtenerContactos = async (req, res) => {
  try {
    const contactos = await Contacto.find().sort({ creadoEn: -1 }); 
    res.status(200).json(contactos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los contactos' });
  }
};

// Obtener un contacto por su ID
exports.obtenerContactoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const contacto = await Contacto.findById(id);

    if (!contacto) {
      return res.status(404).json({ mensaje: 'Contacto no encontrado' });
    }

    res.status(200).json(contacto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el contacto' });
  }
};



// Eliminar un contacto por su ID
exports.eliminarContacto = async (req, res) => {
  try {
    const { id } = req.params;

    const contactoEliminado = await Contacto.findByIdAndDelete(id);

    if (!contactoEliminado) {
      return res.status(404).json({ mensaje: 'Contacto no encontrado' });
    }

    res.status(200).json({ mensaje: 'Contacto eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el contacto' });
  }
};

// Responder a un contacto por ID
exports.responderContacto = async (req, res) => {
  try {
    const { id } = req.params;
    const { mensaje } = req.body;

    // Busca el contacto por ID
    const contacto = await Contacto.findById(id);

    if (!contacto) {
      return res.status(404).json({ mensaje: 'Contacto no encontrado' });
    }

    // Enviar el correo con la respuesta
    await enviarEmailRespuesta(contacto.correo, contacto.asunto, mensaje);

    res.status(200).json({ mensaje: 'Respuesta enviada exitosamente' });
  } catch (error) {
    console.error('Error al enviar la respuesta:', error);
    res.status(500).json({ mensaje: 'Error al enviar la respuesta' });
  }
};
