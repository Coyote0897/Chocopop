import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// Layout
import Sidebar from "./componentes/layout/sidebar";
// Componentes
import Dashboard from "./componentes/Dashboard/Dashboard";
import Productos from "./componentes/productos/productos";
import Categorias from "./componentes/categorias/categorias";
import Ventas from "./componentes/Ventas/ventas";
import Clientes from "./componentes/clientes/clientes";
import Reportes from "./componentes/reportes/Reportes";
import Login from "./componentes/administracion/login";
import Usuarios from "./componentes/usuarios/Usuarios";
import Contacto from "./componentes/contactos/Contacto";
import PageNotFound from "./componentes/error/PageNotFound"; 
import Pedidos from "./componentes/pedidos/Pedidos"; 

//rutas protegidas
import AdminProtectedRoute from "./componentes/rutas/AdminProtectedRoute"; // Importa el nuevo componente

// Componente para rutas protegidas
const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Fragment>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />

          {/* Rutas protegidas */}
          <Route
            path="*"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <div className="flex h-screen">
                  <Sidebar />
                  <div className="flex-1 overflow-y-auto">
                    <div className="p-6">
                      <Routes>
                        <Route path="/Contacto" element={<Contacto />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/productos" element={<Productos />} />
                        <Route path="/categorias" element={<Categorias />} />
                        <Route path="/ventas" element={<Ventas />} />
                        <Route path="/clientes" element={<Clientes />} />
                        <Route path="/reportes" element={<Reportes />} />
                        <Route path="/pedidos" element={<Pedidos />} />

                        
                        <Route
                          path="/Usuarios"
                          element={
                            <AdminProtectedRoute>
                              <Usuarios />
                            </AdminProtectedRoute>
                          }
                        />

                        {/* Página 404 */}
                        <Route path="*" element={<PageNotFound />} />
                      </Routes>
                    </div>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

         
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
