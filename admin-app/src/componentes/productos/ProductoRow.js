// /components/Productos/ProductoRow.js
import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
//traducir


const ProductoRow = ({ producto, eliminarProducto,abrirModalEditar  }) => (
  <tr className="text-center">
    <td className="p-3 border border-gray-300">
      <img src={producto.imagen || "https://via.placeholder.com/300"} alt={producto.nombre} className="w-36 h-36 object-cover" />
    </td>
    <td className="p-3 border border-gray-300">{producto.nombre || "Sin nombre"}</td>
    <td className="p-3 border border-gray-300">{producto.descripcion || "Sin descripción"}</td>
    <td className="p-3 border border-gray-300">{producto.pais || "Sin país"}</td>
    <td className="p-3 border border-gray-300">{producto.ingredientes || "Sin ingredientes"}</td>
    <td className="p-3 border border-gray-300">{producto.precio || 0} Bs</td>
   
    
    <td className="p-3 border border-gray-300">
    <div className="flex justify-center space-x-2">
        <button
          className="flex items-center px-2 py-1 bg-blue-500 text-white rounded-md"
          onClick={() => abrirModalEditar(producto)}
        >
          <PencilIcon className="h-5 w-5" />
        </button>
        <button
          className="flex items-center px-2 py-1 bg-red-500 text-white rounded-md"
          onClick={() => eliminarProducto(producto._id)}
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </td>
  </tr>
);

export default ProductoRow;
