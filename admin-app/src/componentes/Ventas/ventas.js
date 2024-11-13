import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { obtenerVentas, crearVenta, obtenerVentaPorId,obtenerProductoPorCodigoDeBarras } from './ventasService';
import VentaRow from './VentaRow';

const Ventas = () => {
    const [ventas, setVentas] = useState([]);
    const [ventasOriginales, setVentasOriginales] = useState([]);
    const [productosVenta, setProductosVenta] = useState([]);
    const [fechaInicio, setFechaInicio] = useState('');

    useEffect(() => {
        const fetchVentas = async () => {
            const ventasData = await obtenerVentas();
            setVentasOriginales(ventasData);
            // Filtrar ventas por la fecha actual
            const hoy = new Date();
            const ventasHoy = ventasData.filter((venta) => {
                const fechaVenta = new Date(venta.fecha);
                return (
                    fechaVenta.getDate() === hoy.getDate() &&
                    fechaVenta.getMonth() === hoy.getMonth() &&
                    fechaVenta.getFullYear() === hoy.getFullYear()
                );
            });
            setVentas(ventasHoy);
        };
        fetchVentas();
    }, []);

    const filtrarVentasPorFecha = () => {
        const ventasFiltradas = ventasOriginales.filter((venta) => {
            const fechaVenta = new Date(venta.fecha);
            const fechaSeleccionada = fechaInicio ? new Date(fechaInicio) : null;
    
            const fechaVentaUTC = Date.UTC(fechaVenta.getFullYear(), fechaVenta.getMonth(), fechaVenta.getDate());
            const fechaSeleccionadaUTC = fechaSeleccionada ? Date.UTC(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth(), fechaSeleccionada.getDate()) : null;
    
            return fechaSeleccionadaUTC && fechaVentaUTC === fechaSeleccionadaUTC;
        });
        setVentas(ventasFiltradas);
    };
    
    

    const handleVerDetalles = async (idVenta) => {
        try {
            const venta = await obtenerVentaPorId(idVenta);
            const fechaVenta = new Date(venta.fecha).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            });

            const productosDetalles = venta.productos.map((item) => {
                const precioTotalProducto = item.producto.precio * item.cantidad;
                return `
                    <li style="margin-bottom: 10px;">
                        <strong>Producto:</strong> ${item.producto.nombre}<br>
                        <strong>Precio Unitario:</strong> ${item.producto.precio} Bs<br>
                        <strong>Cantidad:</strong> ${item.cantidad}<br>
                        <strong>Precio Total:</strong> ${precioTotalProducto} Bs
                    </li>
                `;
            }).join('');

            Swal.fire({
                title: 'Detalles de la Venta',
                html: `
                    <p><strong>ID de la Venta:</strong> ${venta._id}</p>
                    <p><strong>Fecha de la Venta:</strong> ${fechaVenta}</p>
                    <ul style="text-align: left; list-style-type: none; padding: 0;">
                        ${productosDetalles}
                    </ul>
                    <p><strong>Total de la Venta:</strong> $${venta.total.toFixed(2)}</p>
                    <p><strong>Método de Pago:</strong> ${venta.metodoPago}</p>
                `,
                icon: 'info',
                confirmButtonText: 'Cerrar'
            });
        } catch (error) {
            Swal.fire("Error", "No se pudieron cargar los detalles de la venta", "error");
        }
    };

    const agregarProductoAVenta = async () => {
        try {
            const { value: codigoBarras } = await Swal.fire({
                title: 'Agregar Producto a la Venta',
                text: 'Ingrese el código de barras del producto',
                input: 'text',
                inputPlaceholder: 'Código de barras',
                showCancelButton: true,
                confirmButtonText: 'Buscar producto'
            });

            if (!codigoBarras) return;

            const producto = await obtenerProductoPorCodigoDeBarras(codigoBarras);
            if (!producto) {
                Swal.fire('Producto no encontrado', 'Verifique el código de barras', 'error');
                return;
            }

            const { value: cantidad } = await Swal.fire({
                title: `Agregar ${producto.nombre}`,
                html: `<p>Precio: $${producto.precio}</p><input id="cantidad" type="number" class="swal2-input" placeholder="Cantidad">`,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Agregar a la Venta',
                preConfirm: () => document.getElementById('cantidad').value
            });

            if (!cantidad) return;

            setProductosVenta((prev) => [
                ...prev,
                {
                    codigo_de_barras: codigoBarras,
                    producto: producto._id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    cantidad: parseInt(cantidad, 10)
                }
            ]);

            Swal.fire('Producto agregado', `${cantidad} unidades de ${producto.nombre} agregado a la venta`, 'success');

        } catch (error) {
            console.error('Error al agregar producto a la venta:', error);
            Swal.fire('Error', 'No se pudo agregar el producto a la venta', 'error');
        }
    };

    const registrarVenta = async () => {
        try {
            if (productosVenta.length === 0) {
                Swal.fire('Error', 'Debe agregar al menos un producto a la venta', 'error');
                return;
            }

            const total = productosVenta.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

            const { value: metodoPago } = await Swal.fire({
                title: 'Método de Pago',
                input: 'select',
                inputOptions: {
                    efectivo: 'Efectivo',
                    tarjeta: 'Tarjeta',
                    transferencia: 'Transferencia'
                },
                inputPlaceholder: 'Seleccione el método de pago',
                showCancelButton: true,
                confirmButtonText: 'Registrar Venta'
            });

            if (!metodoPago) return;

            const nuevaVenta = {
                productos: productosVenta.map(({ codigo_de_barras, cantidad }) => ({ codigo_de_barras, cantidad })),
                total,
                metodoPago
            };

            await crearVenta(nuevaVenta);

            Swal.fire('Venta registrada', 'La venta ha sido registrada correctamente', 'success');

            const ventasActualizadas = await obtenerVentas();
            setVentas(ventasActualizadas);
            setProductosVenta([]);

        } catch (error) {
            console.error('Error al registrar la venta:', error);
            Swal.fire('Error', 'No se pudo registrar la venta', 'error');
        }
    };

    // Función para editar cantidad de producto en la venta
    const editarProducto = (index) => {
        Swal.fire({
            title: 'Editar Cantidad',
            input: 'number',
            inputValue: productosVenta[index].cantidad,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            preConfirm: (nuevaCantidad) => {
                if (nuevaCantidad <= 0) {
                    Swal.showValidationMessage('La cantidad debe ser mayor a 0');
                }
                return nuevaCantidad;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const nuevosProductos = [...productosVenta];
                nuevosProductos[index].cantidad = parseInt(result.value, 10);
                setProductosVenta(nuevosProductos);
            }
        });
    };

    // Función para eliminar producto de la venta
    const eliminarProducto = (index) => {
        Swal.fire({
            title: 'Eliminar Producto',
            text: '¿Está seguro de eliminar este producto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                const nuevosProductos = productosVenta.filter((_, i) => i !== index);
                setProductosVenta(nuevosProductos);
            }
        });
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Gestión de Ventas</h1>
            <div className="mb-4 flex space-x-4">
                <input
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    className="px-4 py-2 border rounded-md"
                    placeholder="Fecha"
                />
                <button
                    onClick={filtrarVentasPorFecha}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Filtrar
                </button>
            </div>
            <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={agregarProductoAVenta}>
                Agregar Producto a Venta
            </button>
            <button className="mb-4 ml-2 px-4 py-2 bg-green-500 text-white rounded-md" onClick={registrarVenta}>
                Registrar Venta
            </button>
            
            <h2 className="text-xl font-semibold mt-6 text-gray-700">Productos en la Venta</h2>
            <table className="min-w-full border border-gray-300 bg-white shadow-lg rounded-lg overflow-hidden mt-4">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-3 border border-gray-300 text-left text-gray-700 font-semibold">Nombre del Producto</th>
                        <th className="p-3 border border-gray-300 text-left text-gray-700 font-semibold">Cantidad</th>
                        <th className="p-3 border border-gray-300 text-left text-gray-700 font-semibold">Total</th>
                        <th className="p-3 border border-gray-300 text-left text-gray-700 font-semibold">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productosVenta.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100 transition duration-200">
                            <td className="p-4 border-b border-gray-300 text-gray-700">{item.nombre}</td>
                            <td className="p-4 border-b border-gray-300 text-gray-700 text-center">{item.cantidad} unidades</td>
                            <td className="p-4 border-b border-gray-300 text-green-600 font-semibold text-right">${(item.precio * item.cantidad).toFixed(2)}</td>
                            <td className="p-4 border-b border-gray-300 text-center">
                                <button onClick={() => editarProducto(index)} className="px-2 py-1 bg-purple-500 text-white rounded-md mr-2">Editar</button>
                                <button onClick={() => eliminarProducto(index)} className="px-2 py-1 bg-red-500 text-white rounded-md">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
    
            <h2 className="text-xl font-semibold mt-6 text-gray-700">Historial de Ventas</h2>
            <table className="min-w-full border border-gray-300 bg-white shadow-lg rounded-lg overflow-hidden mt-4">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-3 border border-gray-300 text-left text-gray-700 font-semibold">Nombre del Producto</th>
                        <th className="p-3 border border-gray-300 text-left text-gray-700 font-semibold">Cantidad</th>
                        <th className="p-3 border border-gray-300 text-left text-gray-700 font-semibold">Total</th>
                        <th className="p-3 border border-gray-300 text-left text-gray-700 font-semibold">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta) => (
                        <VentaRow
                            key={venta._id}
                            venta={venta}
                            verDetalles={handleVerDetalles}
                            editarVenta={() => {}}
                            eliminarVenta={() => {}}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
    
};

export default Ventas;
