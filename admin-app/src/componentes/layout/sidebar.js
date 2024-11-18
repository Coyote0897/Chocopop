import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import {
  HomeIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  CalendarIcon,
  ChartBarIcon,
  TagIcon,
  CakeIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon,
  EnvelopeIcon, 
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <HomeIcon className="w-5 h-5" />, path: "/Dashboard" },
    { name: "Administracion", icon: <UserIcon className="w-5 h-5" />, path: "/Usuarios" },
    { name: "Ventas", icon: <CurrencyDollarIcon className="w-5 h-5" />, path: "/ventas" },
    { name: "Clientes", icon: <UserGroupIcon className="w-5 h-5" />, path: "/clientes" },
    { name: "Productos", icon: <CakeIcon className="w-5 h-5" />, path: "/productos" },
    { name: "Categorias", icon: <TagIcon className="w-5 h-5" />, path: "/categorias" },
    { name: "Pedidos", icon: <CalendarIcon className="w-5 h-5" />, path: "/pedidos" },
    { name: "Reportes", icon: <ChartBarIcon className="w-5 h-5" />, path: "/reportes" },
    { name: "Contactos", icon: <EnvelopeIcon className="w-5 h-5" />, path: "/Contacto" }, // Nuevo ítem
  ];

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se cerrará tu sesión actual.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token"); // Eliminar el token del almacenamiento local
        Swal.fire({
          title: "Sesión cerrada",
          text: "Has cerrado sesión exitosamente.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "/"; 
        });
      }
    });
  };

  return (
    <div className="flex flex-col h-screen w-64 bg-gray-900 text-white">
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <img src="/img/tablero.png" alt="Logo" className="h-10" />
      </div>

      <nav className="flex-1 px-4 py-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-2 rounded-md ${
                isActive ? "bg-gray-800" : "hover:bg-gray-700"
              }`
            }
            onClick={() => setActive(item.name)}
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Botón de Cerrar Sesión */}
      <div className="px-4 py-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 rounded-md hover:bg-gray-700"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5" />
          <span className="ml-3">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
