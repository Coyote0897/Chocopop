import React, { useEffect, useState } from "react";
import axios from "../config/axios";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const response = await axios.get("/usuarios"); // Cambia la ruta si es necesario
        setClientes(response.data);
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      }
    };
    obtenerClientes();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Listado de Clientes</h1>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 border border-gray-300">Nombre</th>
            <th className="p-3 border border-gray-300">Correo</th>
            <th className="p-3 border border-gray-300">Dirección</th>
            <th className="p-3 border border-gray-300">Teléfono</th>
            <th className="p-3 border border-gray-300">Verificado</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente._id} className="bg-white">
              <td className="p-3 border border-gray-300">{cliente.nombre}</td>
              <td className="p-3 border border-gray-300">{cliente.email}</td>
              <td className="p-3 border border-gray-300">{cliente.direccion}</td>
              <td className="p-3 border border-gray-300">{cliente.telefono}</td>
              <td className="p-3 border border-gray-300">
                {cliente.confirmado ? "Sí" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clientes;
