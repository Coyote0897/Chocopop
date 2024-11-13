import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { obtenerProductosPorCategoria } from './reporteService';

Chart.register(ArcElement, Tooltip, Legend);

const ProductosPorCategoriaChart = () => {
   const [chartData, setChartData] = useState(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const data = await obtenerProductosPorCategoria();

            // Ordenar las categorías de mayor a menor según el total de productos
            const sortedData = data.sort((a, b) => b.totalProductos - a.totalProductos);

            // Agregar la cantidad de productos al nombre de cada categoría
            const labels = sortedData.map(item => `${item.nombreCategoria || "Sin categoría"} (${item.totalProductos})`);
            const values = sortedData.map(item => item.totalProductos);

            // Definir una paleta de colores con colores únicos
            const colors = [
               '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
               '#FF6B6B', '#4D4DFF', '#00C49A', '#FFCD72', '#BA68C8', '#4DD0E1',
               '#FFAB91', '#D4E157', '#FF7043', '#8D6E63', '#90A4AE', '#FFB300',
               '#FF5252', '#82B1FF', '#B2FF59', '#FF4081', '#FFEB3B', '#9C27B0'
            ];

            setChartData({
               labels: labels,
               datasets: [
                  {
                     data: values,
                     backgroundColor: colors.slice(0, labels.length) // Usa tantos colores como categorías
                  }
               ]
            });
         } catch (error) {
            console.error("Error al procesar los datos:", error);
         }
      };

      fetchData();
   }, []);

   return (
      <div className="flex flex-col items-center justify-center h-full p-4">
         <h2 className="text-2xl font-bold text-center mb-4">Productos por Categoría</h2>
         <div className="w-full max-w-2xl h-[500px] p-4 bg-white shadow-md rounded-lg">
            {chartData ? (
               <Pie 
                  data={chartData} 
                  options={{
                     maintainAspectRatio: false,
                     responsive: true,
                     plugins: {
                        legend: {
                           position: 'top',
                           labels: {
                              font: {
                                 size: 12 // Tamaño más pequeño para los nombres de las categorías
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

export default ProductosPorCategoriaChart;
