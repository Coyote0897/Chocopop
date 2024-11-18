import axios from '../config/axios';

// Obtener todos los contactos
export const obtenerContactos = async () => {
  try {
    const response = await axios.get('/contactos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los contactos:', error);
    throw error;
  }
};

// Obtener detalles de un contacto por ID
export const obtenerDetalleContacto = async (id) => {
  try {
    const response = await axios.get(`/contactos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el detalle del contacto con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un contacto por ID
export const eliminarContacto = async (id) => {
  try {
    const response = await axios.delete(`/contactos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el contacto con ID ${id}:`, error);
    throw error;
  }
};

// Responder a un contacto
export const responderContacto = async (id, mensaje) => {
  try {
    const response = await axios.post(`/contactos/${id}/responder`, { mensaje });
    return response.data;
  } catch (error) {
    console.error(`Error al responder al contacto con ID ${id}:`, error);
    throw error;
  }
};
