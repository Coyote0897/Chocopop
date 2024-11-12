import React from "react";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/solid";

const VentaRow = ({ venta, verDetalles, editarVenta, eliminarVenta }) => (
  <tr className="text-center bg-white hover:bg-gray-100 transition duration-200">
    <td className="p-3 border border-gray-300">
      {venta.productos.map((item, index) => (
        <div key={index} className="py-1 border-b border-gray-200 last:border-none">
          <span className="font-medium text-gray-700">{item.producto?.nombre || "Sin nombre"}</span>
        </div>
      ))}
    </td>
    <td className="p-3 border border-gray-300">
      {venta.productos.map((item, index) => (
        <div key={index} className="py-1 border-b border-gray-200 last:border-none">
          <span className="text-gray-600">{item.cantidad || 0} unidades</span>
        </div>
      ))}
    </td>
    <td className="p-3 border border-gray-300 text-green-600 font-semibold">
      {venta.total.toFixed(2)} Bs
    </td>
    
    <td className="p-3 border border-gray-300">
      <div className="flex justify-center space-x-2">
        <button
          className="flex items-center px-2 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition duration-150"
          onClick={() => verDetalles(venta._id)}  
        >
          <EyeIcon className="h-5 w-5" />
        </button>
        <button
          className="flex items-center px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-150"
          onClick={() => editarVenta(venta._id)}
        >
          <PencilIcon className="h-5 w-5" />
        </button>
        <button
          className="flex items-center px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-150"
          onClick={() => eliminarVenta(venta._id)}
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </td>
  </tr>
);

export default VentaRow;
