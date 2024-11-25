import React from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2"; // Asegúrate de tener instalada esta librería

const AdminProtectedRoute = ({ children }) => {
  const cargo = localStorage.getItem("cargo");

  if (cargo !== "Administrador") {
    // Mostrar alerta al usuario
    Swal.fire({
      icon: "error",
      title: "Acceso Denegado",
      text: "Usted no tiene autorización para ingresar a este panel.",
    });

    
    return <Navigate to="/dashboard" replace />;
  }

  return children; 
};

export default AdminProtectedRoute;
