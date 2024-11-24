import React, { useEffect, useState } from "react";
import VentasPorDiaChart from "../reportes/VentasPorDiaChart";
import ProductosPorCategoriaChart from "../reportes/ProductosPorCategoriaChart";
import { FaChartLine, FaTags } from "react-icons/fa";

const Dashboard = () => {
  const [fechaHoraActual, setFechaHoraActual] = useState("");
  const [cargoUsuario, setCargoUsuario] = useState("");

  // Obtener fecha y hora actual
  useEffect(() => {
    const obtenerFechaHora = () => {
      const opciones = { timeZone: "America/La_Paz", hour12: false };
      const now = new Date();
      const fechaHora = now.toLocaleString("es-BO", opciones);
      setFechaHoraActual(fechaHora);
    };

    obtenerFechaHora();
    const interval = setInterval(() => {
      obtenerFechaHora();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Obtener el cargo del usuario desde localStorage
  useEffect(() => {
    const fetchCargoUsuario = () => {
      try {
        const cargo = localStorage.getItem("cargo");
        if (!cargo) {
          throw new Error("Cargo no encontrado en localStorage.");
        }
        setCargoUsuario(cargo);
      } catch (error) {
        console.error("Error al obtener el cargo del usuario:", error);
        setCargoUsuario("No especificado");
      }
    };

    fetchCargoUsuario();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6 animate-fade-in">
      {/* Título del Dashboard */}
      <div className="w-full max-w-6xl text-center mb-8">
        <h1 className="text-5xl font-extrabold text-gray-800 drop-shadow-lg">¡Bienvenido al Dashboard!</h1>
        <p className="text-xl text-gray-600 mt-2">
          Gestiona productos, ventas, categorías y más.
        </p>
        {/* Mostrar cargo y fecha/hora */}
        <div className="mt-4 text-gray-700">
          <p className="text-lg">
            <span className="font-semibold">Cargo:</span> {cargoUsuario}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Fecha y hora actual:</span> {fechaHoraActual}
          </p>
        </div>
      </div>

      {/* Contenedor de gráficos */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center mb-4">
            <FaChartLine className="text-blue-500 text-2xl mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Ventas por Día</h2>
          </div>
          <VentasPorDiaChart mes={11} anio={2024} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center mb-4">
            <FaTags className="text-green-500 text-2xl mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Productos por Categoría</h2>
          </div>
          <ProductosPorCategoriaChart />
        </div>
      </div>

      {/* Pie de página */}
      <footer className="mt-12 text-gray-600 text-sm">
        © 2024 Choco Pop - Dashboard. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Dashboard;
