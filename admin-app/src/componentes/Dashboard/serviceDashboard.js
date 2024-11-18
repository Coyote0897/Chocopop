import clienteAxios from "../config/axios";

// Obtener el cargo del usuario autenticado
export const obtenerCargoUsuario = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No hay token disponible.");
    }

    // Llamar al endpoint para obtener el cargo
    const { data } = await clienteAxios.post("/admin/iniciar-sesion", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.cargo; 
  } catch (error) {
    console.error("Error al obtener el cargo del usuario:", error);
    throw error;
  }
};
