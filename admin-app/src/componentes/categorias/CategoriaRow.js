import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const CategoriaRow = ({ categoria, eliminarCategoria, abrirModalEditar }) => (
  <tr className="text-center">
    <td className="p-3 border border-gray-300">{categoria.nombre || "Sin nombre"}</td>
    <td className="p-3 border border-gray-300">{categoria.descripcion || "Sin descripción"}</td>
    <td className="p-3 border border-gray-300">
      <div className="flex justify-center space-x-2">
        <button
          className="flex items-center px-2 py-1 bg-blue-500 text-white rounded-md"
          onClick={() => abrirModalEditar(categoria)}
        >
          <PencilIcon className="h-5 w-5" />
        </button>
        <button
          className="flex items-center px-2 py-1 bg-red-500 text-white rounded-md"
          onClick={() => eliminarCategoria(categoria._id)}
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </td>
  </tr>
);

export default CategoriaRow;
