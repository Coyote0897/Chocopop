import React, { useEffect, useState } from 'react';
import { obtenerPedidos } from './pedidosService';
import PedidoRow from './PedidoRow';

const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);

    // Función para cargar los pedidos
    const cargarPedidos = async () => {
        try {
            const data = await obtenerPedidos();
            setPedidos(data);
        } catch (error) {
            console.error('Error al cargar los pedidos:', error);
        }
    };

    useEffect(() => {
        cargarPedidos();
    }, []);

    return (
        <div className="container mx-auto px-4 mt-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Gestión de Pedidos</h1>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Cliente</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Productos</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Total</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Estado</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Dirección</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Teléfono</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map((pedido) => (
                        <PedidoRow key={pedido._id} pedido={pedido} refrescarPedidos={cargarPedidos} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Pedidos;
