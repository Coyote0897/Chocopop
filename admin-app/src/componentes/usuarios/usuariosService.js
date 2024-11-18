import axios from "../config/axios";

// Obtener lista de usuarios
export const obtenerUsuarios = async () => {
  try {
    const response = await axios.get("/admin/listar-usuarios");
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

// Crear un usuario
export const crearUsuario = async (usuarioData) => {
  try {
    const response = await axios.post("/admin/crear-cuenta", usuarioData);
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};

// Eliminar un usuario
export const eliminarUsuario = async (id) => {
  try {
    await axios.delete(`/admin/eliminar-usuario/${id}`);
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};

// Editar un usuario
export const editarUsuario = async (id, usuarioData) => {
  try {
    const response = await axios.put(`/admin/editar-usuario/${id}`, usuarioData);
    return response.data;
  } catch (error) {
    console.error("Error al editar usuario:", error);
    throw error;
  }
};
