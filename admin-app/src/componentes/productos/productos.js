// /components/Productos/Productos.js
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Modal from "react-modal";
import ProductoRow from "./ProductoRow";
import { obtenerProductos, eliminarProducto, agregarProducto, obtenerProductoPorCodigo, actualizarProducto } from "./productosService";

Modal.setAppElement("#root");

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [codigo, setCodigo] = useState("");
  const [modalCodigoOpen, setModalCodigoOpen] = useState(false);
  const [modalManualOpen, setModalManualOpen] = useState(false);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
const [productoAEditar, setProductoAEditar] = useState(null);
  const [producto, setProducto] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    codigoManual: `${Date.now()}`,
    imagen: null,
  });

  // Cargar productos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productos = await obtenerProductos();
        setProductos(productos);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };
    fetchData();
  }, []);

  //eliminar

  const handleEliminarProducto = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eliminarProducto(id);
          setProductos((prev) => prev.filter((prod) => prod._id !== id));
          Swal.fire("Eliminado", "El producto ha sido eliminado", "success");
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar el producto", "error");
        }
      }
    });
  };

  //agregar por codigo

  const handleAgregarPorCodigo = async () => {
    try {
      const producto = await obtenerProductoPorCodigo(codigo);
  
      const existeProducto = productos.some(
        (prod) => prod.codigo_de_barras === producto.codigo_de_barras
      );
  
      if (existeProducto) {
        Swal.fire("Advertencia", "El producto ya ha sido agregado", "warning");
        setCodigo(""); 
        return;
      }
  
      setProductos((prev) => [...prev, producto]);
      Swal.fire("Producto agregado", "", "success");
    } catch (error) {
      Swal.fire("Error", "Producto no encontrado", "error");
    } finally {
      setCodigo(""); 
      setModalCodigoOpen(false); 
    }
  };
  
  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProducto((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  //agregar manualmente 

  const handleAgregarManual = async () => {
    try {
      const existeProducto = productos.some(
        (prod) => prod.codigo_de_barras === producto.codigoManual
      );
  
      if (existeProducto) {
        Swal.fire("Advertencia", "El producto ya ha sido agregado", "warning");
        setModalManualOpen(false);
        return;
      }
  
      const formData = new FormData();
      formData.append("nombre", producto.nombre);
      formData.append("categoria", producto.categoria);
      formData.append("precio", producto.precio);
      formData.append("codigo_de_barras", producto.codigoManual);
  
      if (producto.imagen) {
        formData.append("imagen", producto.imagen);
      }
  
      await agregarProducto(formData);
  
      Swal.fire("Producto agregado", "", "success");
      setModalManualOpen(false);
      setProducto({
        nombre: "",
        categoria: "",
        precio: "",
        codigoManual: `BAR${Date.now()}`,
        imagen: null,
      });
  
      const productosActualizados = await obtenerProductos();
      setProductos(productosActualizados);
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      Swal.fire("Error", "No se pudo agregar el producto", "error");
    }
  };
  
  //editar producto 

  const abrirModalEditar = (producto) => {
    setProductoAEditar(producto);
    setModalEditarOpen(true);
  };
  
  const handleChangeEditar = (e) => {
    const { name, value, files } = e.target;
    setProductoAEditar((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };
  
  const handleEditarProducto = async () => {
    try {
      const formData = new FormData();
      formData.append("nombre", productoAEditar.nombre);
      formData.append("categoria", productoAEditar.categoria);
      formData.append("precio", productoAEditar.precio);
      formData.append("codigo_de_barras", productoAEditar.codigo_de_barras);
  
      if (productoAEditar.imagen) {
        formData.append("imagen", productoAEditar.imagen);
      }
  
      await actualizarProducto(productoAEditar._id, formData);
  
      Swal.fire("Producto actualizado", "", "success");
      setModalEditarOpen(false);
  
      const productosActualizados = await obtenerProductos();
      setProductos(productosActualizados);
    } catch (error) {
      console.error("Error al editar el producto:", error);
      Swal.fire("Error", "No se pudo editar el producto", "error");
    }
  };
  
  

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Todos los productos</h2>
        <div className="space-x-2">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setModalCodigoOpen(true)}
          >
            + Agregar con Código de Barras
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => setModalManualOpen(true)}
          >
            + Agregar Manualmente
          </button>
        </div>
      </div>


      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200 text-center">
            <th className="p-3 border border-gray-300">Imagen</th>
            <th className="p-3 border border-gray-300">Nombre</th>
            <th className="p-3 border border-gray-300">Descripción</th>
            <th className="p-3 border border-gray-300">País</th>
            <th className="p-3 border border-gray-300">Ingredientes</th>
            <th className="p-3 border border-gray-300">Precio</th>
            <th className="p-3 border border-gray-300">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <ProductoRow
              key={producto._id}
              producto={producto}
              eliminarProducto={handleEliminarProducto}
              abrirModalEditar={abrirModalEditar}

            />
          ))}
        </tbody>
      </table>

      {/* Modal para Código de Barras */}
      <Modal
        isOpen={modalCodigoOpen}
        onRequestClose={() => {
          setModalCodigoOpen(false);
          setCodigo("");
        }}
        className="bg-white p-6 rounded shadow max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-lg font-semibold mb-4">Agregar Producto por Código de Barras</h2>
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          placeholder="Código de Barras"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 mr-2 rounded"
          onClick={handleAgregarPorCodigo}
        >
          Agregar
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setModalCodigoOpen(false); 
            setCodigo(""); 
          }}
        >
          Cancelar
        </button>
      </Modal>

      {/* Modal para Agregar Manualmente */}
      <Modal
        isOpen={modalManualOpen}
        onRequestClose={() => setModalManualOpen(false)}
        className="bg-white p-6 rounded shadow max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-lg font-semibold mb-4">Agregar Producto Manualmente</h2>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={producto.nombre}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={producto.categoria}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={producto.precio}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="file"
          name="imagen"
          onChange={handleChange}
          className="w-full mb-4"
        />
        <button
          className="bg-green-600 text-white px-4 py-2 mr-2 rounded"
          onClick={handleAgregarManual}
        >
          Agregar
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => setModalManualOpen(false)}
        >
          Cancelar
        </button>
      </Modal>

      <Modal
  isOpen={modalEditarOpen}
  onRequestClose={() => setModalEditarOpen(false)}
  className="bg-white p-6 rounded shadow max-w-md mx-auto mt-20"
  overlayClassName="fixed inset-0 bg-black bg-opacity-50"
>
  <h2 className="text-lg font-semibold mb-4">Editar Producto</h2>
  <input
    type="text"
    name="nombre"
    placeholder="Nombre"
    value={productoAEditar?.nombre || ""}
    onChange={handleChangeEditar}
    className="w-full mb-4 p-2 border rounded"
  />
  <input
    type="text"
    name="categoria"
    placeholder="Categoría"
    value={productoAEditar?.categoria || ""}
    onChange={handleChangeEditar}
    className="w-full mb-4 p-2 border rounded"
  />
  <input
    type="number"
    name="precio"
    placeholder="Precio"
    value={productoAEditar?.precio || ""}
    onChange={handleChangeEditar}
    className="w-full mb-4 p-2 border rounded"
  />
  <input
    type="file"
    name="imagen"
    onChange={handleChangeEditar}
    className="w-full mb-4"
  />
  <button
    className="bg-yellow-500 text-white px-4 py-2 mr-2 rounded"
    onClick={handleEditarProducto}
  >
    Guardar
  </button>
  <button
    className="bg-red-500 text-white px-4 py-2 rounded"
    onClick={() => setModalEditarOpen(false)}
  >
    Cancelar
  </button>
</Modal>
    </div>
  );
};

export default Productos;
