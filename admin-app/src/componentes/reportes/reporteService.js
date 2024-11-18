
import axios from '../config/axios';

export const obtenerProductosPorCategoria = async () => {
   try {
      const response = await axios.get('/reportes/productos-por-categoria');
      return response.data;
   } catch (error) {
      console.error("Error al obtener datos del reporte:", error);
      throw error;
   }
};
export const obtenerVentasPorDia = async (mes, anio) => {
    try {
        const respuesta = await axios.get(`/reportes/ventas-por-dia`, {
            params: { mes, anio }
        });
        return respuesta.data;
    } catch (error) {
        console.error("Error al obtener ventas por día:", error);
        throw error;
    }
};

export const obtenerVentasPorMetodoPago = async () => {
    const response = await axios.get('/reportes/ventas-por-metodo-pago');
    return response.data;
};