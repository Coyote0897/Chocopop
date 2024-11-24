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
    { name: "Contactos", icon: <EnvelopeIcon className="w-5 h-5" />, path: "/Contacto" },
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
        localStorage.removeItem("token");
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
    <div className="flex flex-col h-screen w-64 bg-gray-900 text-white shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-center h-16 border-b border-gray-700 bg-gradient-to-r from-purple-700 to-indigo-500 shadow-md">
        <Link to="/dashboard">
          <img src="/img/tablero.png" alt="Logo" className="h-10" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-2 rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-gray-800 border-l-4 border-indigo-500 text-indigo-400"
                  : "hover:bg-gray-700 hover:scale-105"
              }`
            }
            onClick={() => setActive(item.name)}
          >
            <div className="transform transition-transform duration-200 hover:scale-110">
              {item.icon}
            </div>
            <span className="ml-3">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Divider */}
      <div className="border-t border-gray-700 my-4"></div>

      {/* Logout Button */}
      <div className="px-4 py-4">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-red-500 rounded-md hover:bg-red-700 hover:text-white transition-all duration-200"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5" />
          <span className="ml-3">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
