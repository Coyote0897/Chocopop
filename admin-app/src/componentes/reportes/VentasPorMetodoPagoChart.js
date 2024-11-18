import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { obtenerVentasPorMetodoPago } from './reporteService';

Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const VentasPorMetodoPagoChart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await obtenerVentasPorMetodoPago();
                
                // Ordenar los datos de mayor a menor por numeroDeVentas
                const sortedData = data.sort((a, b) => b.numeroDeVentas - a.numeroDeVentas);

                const labels = sortedData.map(item => item.metodoPago);
                const values = sortedData.map(item => item.numeroDeVentas);

                // Define un array de colores para cada barra
                const colors = [
                    'rgba(54, 162, 235, 0.6)', // Azul
                    'rgba(255, 99, 132, 0.6)', // Rojo
                    'rgba(255, 206, 86, 0.6)', // Amarillo
                    'rgba(75, 192, 192, 0.6)', // Verde
                    'rgba(153, 102, 255, 0.6)' // Morado
                ];

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Ventas por Método de Pago',
                            data: values,
                            backgroundColor: colors.slice(0, values.length), // Limitar colores al número de valores
                            borderColor: colors.slice(0, values.length).map(color => color.replace('0.6', '1')), // Bordes con color más opaco
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error("Error al obtener datos de ventas por método de pago:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full p-4">
            <h2 className="text-2xl font-bold text-center mb-4">Ventas por Método de Pago</h2>
            <div className="w-full max-w-2xl h-96 p-4 bg-white shadow-md rounded-lg">
                {chartData ? (
                    <Bar 
                        data={chartData} 
                        options={{
                            maintainAspectRatio: false,
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                            },
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Método de Pago',
                                    },
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Número de Ventas',
                                    },
                                    beginAtZero: true,
                                },
                            },
                        }}
                    />
                ) : (
                    <p className="text-center">Cargando datos...</p>
                )}
            </div>
        </div>
    );
};

export default VentasPorMetodoPagoChart;
