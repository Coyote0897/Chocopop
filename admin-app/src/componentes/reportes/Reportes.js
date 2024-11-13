import React, { useState } from 'react';
import ProductosPorCategoriaChart from './ProductosPorCategoriaChart';
import VentasPorDiaChart from './VentasPorDiaChart';

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
                    <div className="flex flex-col items-center">
                        <VentasPorDiaChart mes={fecha.mes} anio={fecha.anio} />
                        <div className="mt-4 w-full text-center">
                            <label className="text-lg font-semibold text-gray-700 mr-4">Seleccionar Mes y Año:</label>
                            <input 
                                type="month" 
                                onChange={handleFechaChange} 
                                className="p-2 border rounded-lg"
                                value={`${fecha.anio}-${String(fecha.mes).padStart(2, '0')}`}
                            />
                        </div>
                    </div>
                );
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
        <div className="min-h-screen bg-gray-100">
            {/* Barra de navegación con botones */}
            <nav className="bg-white shadow-md py-2 px-6 fixed w-full top-0 z-10">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Navigation Buttons */}
                    <div className="flex space-x-3">
                        <button 
                            onClick={() => setActiveChart('categorias')}
                            className={`px-3 py-1 rounded-lg transition-colors duration-200 ease-in-out ${
                                activeChart === 'categorias' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-500'
                            }`}
                        >
                            Productos por Categoría
                        </button>
                        <button 
                            onClick={() => setActiveChart('ventas-dia')}
                            className={`px-3 py-1 rounded-lg transition-colors duration-200 ease-in-out ${
                                activeChart === 'ventas-dia' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-500'
                            }`}
                        >
                            Ventas por Día
                        </button>
                    </div>
                </div>
            </nav>
            
            <div className="flex flex-col items-center pt-20 px-6">
                <div className="w-full max-w-screen-xl bg-white shadow-lg rounded-lg p-6">
                    {/* Fecha actual */}
                    <div className="text-center mb-4">
                        <p className="text-xl font-semibold text-gray-800">{fechaActual}</p>
                    </div>
                    {renderChart()}
                </div>
            </div>
        </div>
    );
};

export default Reportes;
