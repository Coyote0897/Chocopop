import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { actualizarEstadoPedido } from './pedidosService';
import { EyeIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

const PedidoRow = ({ pedido, refrescarPedidos }) => {
    const [mostrarDetalles, setMostrarDetalles] = useState(false);

    const cambiarEstado = async () => {
        const { value: nuevoEstado } = await Swal.fire({
            title: 'Actualizar estado',
            input: 'select',
            inputOptions: {
                Pendiente: 'Pendiente',
                Enviado: 'Enviado',
                Entregado: 'Entregado',
            },
            inputPlaceholder: 'Selecciona el nuevo estado',
            showCancelButton: true,
        });

        if (nuevoEstado) {
            try {
                await actualizarEstadoPedido(pedido._id, nuevoEstado);
                Swal.fire('¡Actualizado!', `El estado ha sido cambiado a ${nuevoEstado}`, 'success');
                refrescarPedidos();
            } catch (error) {
                Swal.fire('Error', 'No se pudo actualizar el estado', 'error');
            }
        }
    };

    const verDetalles = () => {
        setMostrarDetalles(true);
    };

    const formatearFecha = (fechaISO) => {
        const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(fechaISO).toLocaleDateString('es-ES', opciones);
    };

    return (
        <>
            <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{pedido.usuario?.nombre} ({pedido.usuario?.email})</td>
                <td className="border border-gray-300 px-4 py-2">
                    {pedido.productos.map((prod, index) => (
                        <div key={index}>
                            {prod.nombre} - {prod.cantidad} unidades
                        </div>
                    ))}
                </td>
                <td className="border border-gray-300 px-4 py-2">{pedido.total} Bs</td>
                <td className="border border-gray-300 px-4 py-2">{pedido.estado}</td>
                <td className="border border-gray-300 px-4 py-2">{pedido.direccionDestinatario}</td>
                <td className="border border-gray-300 px-4 py-2">{pedido.telefonoDestinatario}</td>
                <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded flex items-center"
                        onClick={verDetalles}
                    >
                        <EyeIcon className="h-5 w-5 mr-1" />
                    </button>
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded flex items-center"
                        onClick={cambiarEstado}
                    >
                        <ArrowPathIcon className="h-5 w-5 mr-1" />
                    </button>
                </td>
            </tr>

            {mostrarDetalles && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center transition-opacity duration-300">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-3/4 max-h-[80%] overflow-y-auto transform transition-transform duration-300 scale-105">
                        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Detalles del Pedido</h2>
                        
                        <div className="border-b pb-4 mb-4">
                            <p><strong>Cliente:</strong> {pedido.usuario?.nombre} ({pedido.usuario?.email})</p>
                            <p><strong>Nombre Destinatario:</strong> {pedido.nombreDestinatario}</p>
                            <p><strong>Dirección Destinatario:</strong> {pedido.direccionDestinatario}</p>
                            <p><strong>Teléfono Destinatario:</strong> {pedido.telefonoDestinatario}</p>
                            <p><strong>Fecha:</strong> {formatearFecha(pedido.fecha)}</p>
                            <p><strong>Estado:</strong> {pedido.estado}</p>
                        </div>

                        <div className="border-b pb-4 mb-4">
                            <h3 className="text-2xl font-semibold mb-3">Productos:</h3>
                            <ul className="space-y-2">
                                {pedido.productos.map((prod, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded shadow-sm"
                                    >
                                        <span>{prod.nombre}</span>
                                        <span>{prod.cantidad} unidades</span>
                                        <span>{prod.subtotal} Bs</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <p className="text-xl font-bold text-right">Total: {pedido.total} Bs</p>

                        <div className="flex justify-center mt-6">
                            <button
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded"
                                onClick={() => setMostrarDetalles(false)}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PedidoRow;
