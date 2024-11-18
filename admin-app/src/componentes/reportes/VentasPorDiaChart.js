import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';
import { obtenerVentasPorDia } from './reporteService';

Chart.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const VentasPorDiaChart = ({ mes, anio }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await obtenerVentasPorDia(mes, anio);
                console.log("Data from API:", data); 

                // Obtener el número de días del mes
                const diasEnMes = new Date(anio, mes, 0).getDate();

                // Crear un mapa con días del mes inicializado en 0
                const ventasPorDia = Array.from({ length: diasEnMes }, (_, i) => ({
                    dia: i + 1,
                    totalVentasDia: 0
                }));

                // Combinar los datos de la API con los días del mes
                data.forEach(item => {
                    const index = item.dia - 1;
                    ventasPorDia[index].totalVentasDia = item.totalVentasDia;
                });

                // Preparar los datos para el gráfico
                const labels = ventasPorDia.map(item => item.dia.toString());
                const values = ventasPorDia.map(item => item.totalVentasDia);

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
    <div className="w-full max-w-6xl h-[500px] p-6 bg-white shadow-md rounded-lg">
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
