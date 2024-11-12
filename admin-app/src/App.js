import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Layout
import Sidebar from "./componentes/layout/sidebar";
// Productos
import Productos from "./componentes/productos/productos";
//categorias
import Categorias from "./componentes/categorias/categorias";
//ventas
import Ventas from './componentes/Ventas/ventas';

import Clientes from './componentes/clientes/clientes'; 





function App() {
  return (
    <Router>
      <Fragment>
        <div className="flex h-screen">
         
          <Sidebar />

          
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <Routes>
                <Route path="/productos" element={<Productos />} />
                <Route path="/categorias" element={<Categorias />} />
                <Route path="/ventas" element={<Ventas/>} />
                <Route path="/clientes" element={<Clientes />} />
              </Routes>
            </div>
          </div>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
