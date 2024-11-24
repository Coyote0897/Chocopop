import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { iniciarSesion } from "../administracion/loginServices"; 
import Swal from "sweetalert2"; 

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {  
      const data = await iniciarSesion(usuario, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("cargo", data.cargo); 

     
      Swal.fire({
        title: "Inicio de Sesión Exitoso",
        text: "¡Bienvenido al sistema!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        
        navigate("/dashboard");

        
        window.location.reload();
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Usuario</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
