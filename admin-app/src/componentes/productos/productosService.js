import clienteAxios from "../config/axios";

export const obtenerProductos = async () => {
  const response = await clienteAxios.get("/productos");
  return response.data;
};

export const eliminarProducto = async (id) => {
  await clienteAxios.delete(`/productos/${id}`);
};

export const obtenerProductoPorCodigo = async (codigo) => {
  const response = await clienteAxios.get(`/productos/codigo/${codigo}`);
  return response.data;
};

export const agregarProducto = async (formData) => {
  await clienteAxios.post("/productos", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const actualizarProducto = async (id, formData) => {
  await clienteAxios.put(`/productos/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};



