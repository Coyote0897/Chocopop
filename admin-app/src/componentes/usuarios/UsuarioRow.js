import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const UsuarioRow = ({ usuario, eliminarUsuario, abrirModalEditar }) => (
  <tr className="text-center">
    <td className="p-3 border border-gray-300">{usuario.usuario || "Sin usuario"}</td>
    <td className="p-3 border border-gray-300">{usuario.cargo || "Sin cargo"}</td>
    <td className="p-3 border border-gray-300">
      <div className="flex justify-center space-x-2">
        <button
          className="flex items-center px-2 py-1 bg-blue-500 text-white rounded-md"
          onClick={() => abrirModalEditar(usuario)}
        >
          <PencilIcon className="h-5 w-5" />
        </button>
        <button
          className="flex items-center px-2 py-1 bg-red-500 text-white rounded-md"
          onClick={() => eliminarUsuario(usuario._id)}
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </td>
  </tr>
);

export default UsuarioRow;
