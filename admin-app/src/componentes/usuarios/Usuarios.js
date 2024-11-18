import React, { useState, useEffect } from "react";
import {
  obtenerUsuarios,
  crearUsuario,
  eliminarUsuario,
  editarUsuario,
} from "./usuariosService";
import UsuarioRow from "./UsuarioRow";
import Swal from "sweetalert2";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const data = await obtenerUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };

    cargarUsuarios();
  }, []);

  const agregarUsuario = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Registrar Nuevo Usuario",
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Usuario">
        <select id="swal-input2" class="swal2-input">
          <option value="Administrador">Administrador</option>
          <option value="Empleado">Empleado</option>
        </select>
        <input id="swal-input3" class="swal2-input" placeholder="Contraseña" type="password">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      preConfirm: () => {
        const usuario = document.getElementById("swal-input1").value.trim();
        const cargo = document.getElementById("swal-input2").value;
        const password = document.getElementById("swal-input3").value.trim();

        if (!usuario || !password) {
          Swal.showValidationMessage("Todos los campos son obligatorios.");
          return;
        }

        return { usuario, cargo, password };
      },
    });

    if (formValues) {
      try {
        await crearUsuario(formValues);
        const data = await obtenerUsuarios();
        setUsuarios(data);
        Swal.fire("¡Éxito!", "Usuario registrado exitosamente.", "success");
      } catch (error) {
        Swal.fire("Error", "Hubo un problema al registrar el usuario.", "error");
      }
    }
  };

  const eliminarUsuarioHandler = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará al usuario de forma permanente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (confirm.isConfirmed) {
        await eliminarUsuario(id);
        setUsuarios(usuarios.filter((usuario) => usuario._id !== id));
        Swal.fire("Eliminado", "Usuario eliminado con éxito.", "success");
      }
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al eliminar el usuario.", "error");
    }
  };

  const abrirModalEditar = async (usuario) => {
    const { value: formValues } = await Swal.fire({
      title: "Editar Usuario",
      html: `
        <input id="swal-input1" class="swal2-input" value="${usuario.usuario}" placeholder="Usuario">
        <select id="swal-input2" class="swal2-input">
          <option value="Administrador" ${
            usuario.cargo === "Administrador" ? "selected" : ""
          }>Administrador</option>
          <option value="Empleado" ${
            usuario.cargo === "Empleado" ? "selected" : ""
          }>Empleado</option>
        </select>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Actualizar",
      preConfirm: () => {
        const nuevoUsuario = document.getElementById("swal-input1").value.trim();
        const nuevoCargo = document.getElementById("swal-input2").value;

        if (!nuevoUsuario) {
          Swal.showValidationMessage("El usuario es obligatorio.");
          return;
        }

        return { usuario: nuevoUsuario, cargo: nuevoCargo };
      },
    });

    if (formValues) {
      try {
        await editarUsuario(usuario._id, formValues);
        const data = await obtenerUsuarios();
        setUsuarios(data);
        Swal.fire("¡Éxito!", "Usuario actualizado con éxito.", "success");
      } catch (error) {
        Swal.fire("Error", "Hubo un problema al actualizar el usuario.", "error");
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
      <button
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md"
        onClick={agregarUsuario}
      >
        Agregar Usuario
      </button>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 border border-gray-300">Usuario</th>
            <th className="p-3 border border-gray-300">Cargo</th>
            <th className="p-3 border border-gray-300">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <UsuarioRow
              key={usuario._id}
              usuario={usuario}
              eliminarUsuario={eliminarUsuarioHandler}
              abrirModalEditar={abrirModalEditar}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;
