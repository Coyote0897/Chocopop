import clienteAxios from "../config/axios";

// Obtener todas las ventas
export const obtenerVentas = async () => {
  const response = await clienteAxios.get("/ventas");
  return response.data;
};

// Crear una nueva venta
export const crearVenta = async (ventaData) => {
  try {
      const response = await clienteAxios.post("/ventas", ventaData);
      return response.data;
  } catch (error) {
      console.error("Error al registrar la venta:", error.response || error.message);
      throw error;
  }
};

//ver detalles
export const obtenerVentaPorId = async (idVenta) => {
  try {
    const response = await clienteAxios.get(`/ventas/${idVenta}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los detalles de la venta:", error.response || error.message);
    throw error;
  }
};


