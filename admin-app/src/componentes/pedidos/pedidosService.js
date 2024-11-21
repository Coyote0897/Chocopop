import clienteAxios from '../config/axios';

// Obtener todos los pedidos
export const obtenerPedidos = async () => {
    try {
        const response = await clienteAxios.get('/pedidos');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los pedidos:', error);
        throw error;
    }
};

// Actualizar el estado de un pedido
export const actualizarEstadoPedido = async (id, estado) => {
    try {
        const response = await clienteAxios.put(`/pedidos/${id}`, { estado });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el estado del pedido:', error);
        throw error;
    }
};
