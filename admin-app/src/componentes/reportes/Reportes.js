import React, { useState } from 'react';
import ProductosPorCategoriaChart from './ProductosPorCategoriaChart';
import VentasPorDiaChart from './VentasPorDiaChart';
import VentasPorMetodoPagoChart from './VentasPorMetodoPagoChart';

const Reportes = () => {
    const [fecha, setFecha] = useState({ mes: new Date().getMonth() + 1, anio: new Date().getFullYear() });
    const [activeChart, setActiveChart] = useState('categorias');

    const handleFechaChange = (e) => {
        const [anio, mes] = e.target.value.split('-');
        setFecha({ mes: parseInt(mes), anio: parseInt(anio) });
    };

    const renderChart = () => {
        switch (activeChart) {
            case 'categorias':
                return <ProductosPorCategoriaChart />;
            case 'ventas-dia':
                return (
                    <div className="flex flex-col items-center animate-fadeIn">
                        <VentasPorDiaChart mes={fecha.mes} anio={fecha.anio} />
                        <div className="mt-4 w-full text-center">
                            <label className="text-lg font-semibold text-gray-700 mr-4">Seleccionar Mes y Año:</label>
                            <input 
                                type="month" 
                                onChange={handleFechaChange} 
                                className="p-2 border rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 transition-all"
                                value={`${fecha.anio}-${String(fecha.mes).padStart(2, '0')}`}
                            />
                        </div>
                    </div>
                );
            case 'ventas-metodo-pago':
                return <VentasPorMetodoPagoChart />;
            default:
                return null;
        }
    };

    // Formato de la fecha actual
    const fechaActual = new Date().toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="text-center py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white shadow-lg">
                <h1 className="text-4xl font-extrabold tracking-wider">Reportes</h1>
            </div>

            <nav className="bg-white shadow-md py-3 px-6 mt-4 rounded-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex space-x-4">
                        <button 
                            onClick={() => setActiveChart('categorias')}
                            className={`px-4 py-2 rounded-lg font-medium shadow-md transition-all ${
                                activeChart === 'categorias' 
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-200'
                            }`}
                        >
                            Productos por Categoría
                        </button>
                        <button 
                            onClick={() => setActiveChart('ventas-dia')}
                            className={`px-4 py-2 rounded-lg font-medium shadow-md transition-all ${
                                activeChart === 'ventas-dia' 
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-200'
                            }`}
                        >
                            Ventas por Día
                        </button>
                        <button 
                            onClick={() => setActiveChart('ventas-metodo-pago')}
                            className={`px-4 py-2 rounded-lg font-medium shadow-md transition-all ${
                                activeChart === 'ventas-metodo-pago' 
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-200'
                            }`}
                        >
                            Ventas por Método de Pago
                        </button>
                    </div>
                </div>
            </nav>
            
            <div className="flex flex-col items-center pt-8 px-6">
                <div className="w-full max-w-screen-xl bg-white shadow-xl rounded-lg p-8 mt-4">
                    <div className="text-center mb-6">
                        <p className="text-xl font-semibold text-gray-800">{fechaActual}</p>
                    </div>
                    {renderChart()}
                </div>
            </div>
        </div>
    );
};

export default Reportes;
