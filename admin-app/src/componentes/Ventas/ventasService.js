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
//obtener producto de la base de datos

export const obtenerProductoPorCodigoDeBarras = async (codigoDeBarras) => {
  try {
    const response = await clienteAxios.get(`/ventas/codigo/${codigoDeBarras}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el producto por código de barras:", error.response || error.message);
    throw error;
  }
};

// Eliminar una venta por ID
export const eliminarVentaPorId = async (idVenta) => {
  try {
    const response = await clienteAxios.delete(`/ventas/${idVenta}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la venta:", error.response || error.message);
    throw error;
  }
};


// Buscar productos por nombre
export const obtenerProductoPorNombre = async (nombre) => {
  try {
    const response = await clienteAxios.get(`/productos?nombre=${nombre}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener producto por nombre:", error.response || error.message);
    throw error;
  }
};




