import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import React, { useEffect, useState } from 'react';
import { obtenerContactos, responderContacto, eliminarContacto, obtenerDetalleContacto } from './contactoServices';
import ContactoRow from './ContactoRow';

const MySwal = withReactContent(Swal);

const Contacto = () => {
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarContactos = async () => {
      try {
        const data = await obtenerContactos();
        setContactos(data);
      } catch (err) {
        setError('Error al cargar los contactos. Intenta de nuevo más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargarContactos();
  }, []);

  const handleReply = async (contacto) => {
    const { value: mensaje } = await MySwal.fire({
      title: `Responder a ${contacto.nombre}`,
      input: 'textarea',
      inputLabel: 'Escribe tu mensaje',
      inputPlaceholder: 'Ingresa tu respuesta aquí...',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return '¡El mensaje no puede estar vacío!';
        }
      },
    });

    if (mensaje) {
      try {
        await responderContacto(contacto._id, mensaje);
        MySwal.fire({
          title: 'Mensaje enviado',
          text: `Se ha enviado tu respuesta a ${contacto.correo}`,
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      } catch (error) {
        MySwal.fire({
          title: 'Error',
          text: 'No se pudo enviar la respuesta. Intenta de nuevo.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    }
  };

  const handleDelete = async (id) => {
    const result = await MySwal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await eliminarContacto(id);
        setContactos(contactos.filter((contacto) => contacto._id !== id));
        MySwal.fire({
          title: 'Eliminado',
          text: 'El contacto ha sido eliminado.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      } catch (error) {
        MySwal.fire({
          title: 'Error',
          text: 'No se pudo eliminar el contacto. Intenta de nuevo.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    }
  };

  const handleViewDetails = async (contacto) => {
    try {
      const detalles = await obtenerDetalleContacto(contacto._id);
      MySwal.fire({
        title: `Detalles de ${contacto.nombre}`,
        html: `
          <p><strong>Correo:</strong> ${detalles.correo}</p>
          <p><strong>Asunto:</strong> ${detalles.asunto}</p>
          <p><strong>Mensaje:</strong> ${detalles.mensaje}</p>
        `,
        icon: 'info',
        confirmButtonText: 'Cerrar',
      });
    } catch (error) {
      MySwal.fire({
        title: 'Error',
        text: 'No se pudieron cargar los detalles. Intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500">Cargando contactos...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Contactos y Reclamos</h1>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 border border-gray-300">Nombre</th>
            <th className="p-3 border border-gray-300">Correo</th>
            <th className="p-3 border border-gray-300">Asunto</th>
            <th className="p-3 border border-gray-300">Mensaje</th>
            <th className="p-3 border border-gray-300">Fecha</th>
            <th className="p-3 border border-gray-300">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {contactos.map((contacto) => (
            <ContactoRow
              key={contacto._id}
              contacto={contacto}
              verDetalles={handleViewDetails}
              responderMensaje={handleReply}
              eliminarContacto={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contacto;
