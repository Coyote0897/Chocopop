import React, { useState, useEffect } from "react";
import axios from "../config/axios";
import CategoriaRow from "./CategoriaRow";
import Swal from "sweetalert2";

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await axios.get("/categorias");
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };
    obtenerCategorias();
  }, []);

  const agregarCategoria = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Agregar Nueva Categoría',
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Nombre de la categoría">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Descripción">`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      preConfirm: () => {
        const nombre = document.getElementById('swal-input1').value;
        const descripcion = document.getElementById('swal-input2').value;
        if (!nombre) {
          Swal.showValidationMessage('El nombre es obligatorio');
          return;
        }
        return { nombre, descripcion };
      }
    });

    if (formValues) {
      try {
        await axios.post("/categorias", formValues);
        const response = await axios.get("/categorias");
        setCategorias(response.data);
        Swal.fire('¡Éxito!', 'La categoría ha sido agregada', 'success');
      } catch (error) {
        console.error("Error al agregar la categoría:", error);
        Swal.fire('Error', 'Hubo un problema al agregar la categoría', 'error');
      }
    }
  };

  const eliminarCategoria = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará la categoría de forma permanente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: "Cancelar",
      });

      if (confirm.isConfirmed) {
        await axios.delete(`/categorias/${id}`);
        setCategorias(categorias.filter((categoria) => categoria._id !== id));
        Swal.fire('Eliminada', 'La categoría ha sido eliminada', 'success');
      }
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
      Swal.fire('Error', 'Hubo un problema al eliminar la categoría', 'error');
    }
  };

  const abrirModalEditar = async (categoria) => {
    const { value: formValues } = await Swal.fire({
      title: 'Editar Categoría',
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Nombre de la categoría" value="${categoria.nombre}">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Descripción" value="${categoria.descripcion}">`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      preConfirm: () => {
        const nombre = document.getElementById('swal-input1').value;
        const descripcion = document.getElementById('swal-input2').value;
        if (!nombre) {
          Swal.showValidationMessage('El nombre es obligatorio');
          return;
        }
        return { nombre, descripcion };
      }
    });

    if (formValues) {
      try {
        await axios.put(`/categorias/${categoria._id}`, formValues);
        const response = await axios.get("/categorias");
        setCategorias(response.data);
        Swal.fire('¡Éxito!', 'La categoría ha sido actualizada', 'success');
      } catch (error) {
        console.error("Error al actualizar la categoría:", error);
        Swal.fire('Error', 'Hubo un problema al actualizar la categoría', 'error');
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestión de Categorías</h1>
      <button
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md"
        onClick={agregarCategoria}
      >
        Agregar Categoría
      </button>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 border border-gray-300">Nombre</th>
            <th className="p-3 border border-gray-300">Descripción</th>
            <th className="p-3 border border-gray-300">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <CategoriaRow
              key={categoria._id}
              categoria={categoria}
              eliminarCategoria={eliminarCategoria}
              abrirModalEditar={abrirModalEditar}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categorias;
