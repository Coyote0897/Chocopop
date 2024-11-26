import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

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

// Rutas protegidas
import AdminProtectedRoute from "./componentes/rutas/AdminProtectedRoute";

// Componente para rutas protegidas
const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

// Componente Layout con títulos dinámicos
function Layout({ children }) {
  const location = useLocation();

  // Configura los títulos dinámicos
  const pageTitles = {
    "/": "Choco Pop - Inicio",
    "/Dashboard": "Choco Pop - Dashboard",
    "/dashboard": "Choco Pop - Dashboard",
    "/productos": "Choco Pop - Productos",
    "/categorias": "Choco Pop - Categorías",
    "/ventas": "Choco Pop - Ventas",
    "/clientes": "Choco Pop - Clientes",
    "/reportes": "Choco Pop - Reportes",
    "/Contacto": "Choco Pop - Contacto",
    "/pedidos": "Choco Pop - Pedidos",
    "/Usuarios": "Choco Pop - Usuarios",
    
  };

  // Define el título según la ruta actual o un valor predeterminado
  const title = pageTitles[location.pathname] || "Choco Pop - Página no encontrada";

  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </Fragment>
  );
}

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <HelmetProvider>
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
                  <Layout>
                    <div className="flex h-screen">
                      <Sidebar />
                      <div className="flex-1 overflow-y-auto">
                        <div className="p-6">
                          <Routes>
                            <Route path="/contacto" element={<Contacto />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/productos" element={<Productos />} />
                            <Route path="/categorias" element={<Categorias />} />
                            <Route path="/ventas" element={<Ventas />} />
                            <Route path="/clientes" element={<Clientes />} />
                            <Route path="/reportes" element={<Reportes />} />
                            <Route path="/pedidos" element={<Pedidos />} />

                            <Route
                              path="/usuarios"
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
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Página 404 (fuera de autenticación) */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Fragment>
      </Router>
    </HelmetProvider>
  );
}

export default App;
