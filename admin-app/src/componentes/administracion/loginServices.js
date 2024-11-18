import axios from "../config/axios"; 

export const iniciarSesion = async (usuario, password) => {
  try {
    const response = await axios.post("/admin/iniciar-sesion", {
      usuario,
      password,
    });

    return response.data; 
  } catch (error) {
    
    throw error.response
      ? error.response.data.error
      : "Error en el servidor. Inténtalo más tarde.";
  }
};
