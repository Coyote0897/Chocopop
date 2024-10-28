import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Layout
import Sidebar from "./componentes/layout/sidebar";
// Productos
import Productos from "../src/componentes/productos/productos";

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
              </Routes>
            </div>
          </div>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
