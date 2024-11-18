import React, { useEffect, useState } from "react";
import VentasPorDiaChart from "../reportes/VentasPorDiaChart";
import ProductosPorCategoriaChart from "../reportes/ProductosPorCategoriaChart";
import { obtenerCargoUsuario } from "./serviceDashboard";

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

  // Obtener el cargo del usuario
  useEffect(() => {
    const fetchCargoUsuario = async () => {
      try {
        const cargo = await obtenerCargoUsuario();
        setCargoUsuario(cargo);
      } catch (error) {
        console.error("Error al obtener el cargo:", error);
        setCargoUsuario("No especificado");
      }
    };

    fetchCargoUsuario();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
      {/* Título del Dashboard */}
      <div className="w-full max-w-6xl text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">¡Bienvenido al Dashboard!</h1>
        <p className="text-lg text-gray-600 mt-2">
          Aquí puedes gestionar los productos, ventas, categorías y más.
        </p>
        {/* Mostrar cargo y fecha/hora */}
        <div className="mt-4 text-gray-600">
          <p className="text-sm">Cargo: {cargoUsuario}</p>
          <p className="text-sm">Fecha y hora actual: {fechaHoraActual}</p>
        </div>
      </div>

      {/* Contenedor de gráficos */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <VentasPorDiaChart mes={11} anio={2024} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ProductosPorCategoriaChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
