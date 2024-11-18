import React from 'react';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/solid';

// Función para truncar mensajes largos
const truncarTexto = (texto, limite) => {
  if (texto.length > limite) {
    return texto.substring(0, limite) + '...';
  }
  return texto;
};

const ContactoRow = ({ contacto, verDetalles, responderMensaje, eliminarContacto }) => (
  <tr className="bg-white">
    <td className="p-3 border border-gray-300">{contacto.nombre || 'Sin nombre'}</td>
    <td className="p-3 border border-gray-300">{contacto.correo || 'Sin correo'}</td>
    <td className="p-3 border border-gray-300">{contacto.asunto || 'Sin asunto'}</td>
    <td className="p-3 border border-gray-300">
      {contacto.mensaje ? truncarTexto(contacto.mensaje, 50) : 'Sin mensaje'}
    </td>
    <td className="p-3 border border-gray-300 text-sm text-gray-500">
      {new Date(contacto.creadoEn).toLocaleString()}
    </td>
    <td className="p-3 border border-gray-300">
      <div className="flex justify-center space-x-2">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded-md"
          onClick={() => verDetalles(contacto)}
        >
          <EyeIcon className="h-5 w-5 inline-block" />
        </button>
        <button
          className="px-3 py-1 bg-green-500 text-white rounded-md"
          onClick={() => responderMensaje(contacto)}
        >
          <PencilIcon className="h-5 w-5 inline-block" />
        </button>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded-md"
          onClick={() => eliminarContacto(contacto._id)}
        >
          <TrashIcon className="h-5 w-5 inline-block" />
        </button>
      </div>
    </td>
  </tr>
);

export default ContactoRow;
