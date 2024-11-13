import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';
import { obtenerVentasPorDia } from './reporteService';

Chart.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const VentasPorDiaChart = ({ mes, anio }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        console.log("Mes y Año enviados:", mes, anio);

        const fetchData = async () => {
            try {
                const data = await obtenerVentasPorDia(mes, anio);
                console.log("Data from API:", data); // Verifica los datos obtenidos

                const sortedData = data.sort((a, b) => a.dia - b.dia);
                const labels = sortedData.map(item => item.dia.toString());
                const values = sortedData.map(item => item.totalVentasDia);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Ventas por Día',
                            data: values,
                            fill: false,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.4)',
                            tension: 0.1,
                        },
                    ],
                });
            } catch (error) {
                console.error("Error al obtener los datos de ventas:", error);
            }
        };

        fetchData();
    }, [mes, anio]);

    return (
        <div className="flex flex-col items-center justify-center h-full p-4">
            <h2 className="text-2xl font-bold text-center mb-4">Ventas por Día del Mes</h2>
            <div className="w-full max-w-2xl h-96 p-4 bg-white shadow-md rounded-lg">
                {chartData ? (
                    <Line 
                        data={chartData} 
                        options={{
                            maintainAspectRatio: false,
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                    labels: {
                                        font: {
                                            size: 14
                                        }
                                    }
                                }
                            },
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Día del Mes'
                                    },
                                    ticks: {
                                        callback: function(value) {
                                            return `Día ${this.getLabelForValue(value)}`;
                                        }
                                    }
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Total Ventas'
                                    },
                                    beginAtZero: true,
                                    ticks: {
                                        callback: function(value) {
                                            return `${value} bs`;
                                        }
                                    }
                                }
                            }
                        }}
                    />
                ) : (
                    <p className="text-center">Cargando datos...</p>
                )}
            </div>
        </div>
    );
};

export default VentasPorDiaChart;
