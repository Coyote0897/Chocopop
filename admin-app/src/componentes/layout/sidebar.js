import { useState } from "react";
import { Link, NavLink } from "react-router-dom"; 
import {
  HomeIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  CalendarIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  TagIcon,
  CakeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <HomeIcon className="w-5 h-5" />, path: "/" },
    { name: "Administracion", icon: <UserIcon className="w-5 h-5" />, path: "/administracion" },
    { name: "Ventas", icon: <CurrencyDollarIcon className="w-5 h-5" />, path: "/ventas" },
    { name: "Clientes", icon: <UserGroupIcon className="w-5 h-5" />, path: "/clientes" },
    { name: "Productos", icon: <CakeIcon className="w-5 h-5" />, path: "/productos" },
    { name: "Categorias", icon: <TagIcon className="w-5 h-5" />, path: "/categorias" },
    { name: "Pedidos", icon: <CalendarIcon className="w-5 h-5" />, path: "/pedidos" },
    { name: "Reportes", icon: <ChartBarIcon className="w-5 h-5" />, path: "/reportes" },
  ];

  return (
    <div className="flex flex-col h-screen w-64 bg-gray-900 text-white">
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <img src="" alt="Logo" className="h-10" />
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

      <div className="px-4 py-4 border-t border-gray-700">
        <Link to="/ajustes" className="flex items-center px-4 py-2 rounded-md hover:bg-gray-700">
          <Cog6ToothIcon className="w-5 h-5" />
          <span className="ml-3">Ajustes</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
