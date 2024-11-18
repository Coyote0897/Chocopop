// /components/Productos/Productos.js
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Modal from "react-modal";
import ProductoRow from "./ProductoRow";
//servicios 
import { obtenerProductos, eliminarProducto, agregarProducto, obtenerProductoPorCodigo, actualizarProducto,actualizarPrecioYCategoria,obtenerCategorias } from "./productosService";

Modal.setAppElement("#root");

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [busqueda, setBusqueda] = useState(""); 
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");


  

  //paginador
  const [paginaActual, setPaginaActual] = useState(1);
  const [productosPorPagina] = useState(4);

  const indexOfLastProducto = paginaActual * productosPorPagina;
  const indexOfFirstProducto = indexOfLastProducto - productosPorPagina;

  const cambiarPagina = (numero) => setPaginaActual(numero);

  // Filtrar productos por búsqueda antes de la paginación
  const productosFiltrados = productos.filter((producto) => {
    const categoriaNombre = categorias.find(cat => cat._id === producto.categoria)?.nombre || "";

    // Verificar si el producto coincide con la búsqueda por texto (nombre, código de barras, o nombre de la categoría)
    const coincideBusqueda = 
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      (producto.codigo_de_barras || "").toLowerCase().includes(busqueda.toLowerCase()) ||
      categoriaNombre.toLowerCase().includes(busqueda.toLowerCase());
  
    // Verificar si coincide con la categoría seleccionada o si no hay ninguna categoría seleccionada (mostrar todos)
    const coincideCategoria = 
      categoriaSeleccionada === "" || producto.categoria === categoriaSeleccionada;
  
    return coincideBusqueda && coincideCategoria;
    
  });
  
  
  

const productosPaginados = productosFiltrados.slice(indexOfFirstProducto, indexOfLastProducto);


  // Renderizar botones de paginación
  const renderPaginador = () => {
    const paginas = [];
    for (let i = 1; i <= Math.ceil(productosFiltrados.length / productosPorPagina); i++) {
      paginas.push(i);
    }
    return paginas.map((numero) => (
      <button
        key={numero}
        onClick={() => cambiarPagina(numero)}
        className={`px-4 py-2 mx-1 rounded ${paginaActual === numero ? "bg-blue-500 text-white" : "bg-gray-300"}`}
      >
        {numero}
      </button>
    ));
  };
  

  // Cargar productos y categorías al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productos = await obtenerProductos();
        setProductos(productos);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const categorias = await obtenerCategorias();
        setCategorias(categorias);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    fetchData();
    fetchCategorias();
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
  const handleAgregarPorCodigo = () => {
    Swal.fire({
        title: "Agregar Producto por Código de Barras",
        input: "text",
        inputPlaceholder: "Código de Barras",
        showCancelButton: true,
        confirmButtonText: "Agregar",
        cancelButtonText: "Cancelar",
        preConfirm: async (codigo) => {
            try {
                const producto = await obtenerProductoPorCodigo(codigo);
                const existeProducto = productos.some((prod) => prod.codigo_de_barras === producto.codigo_de_barras);

                if (existeProducto) {
                    Swal.fire("Advertencia", "El producto ya ha sido agregado", "warning");
                    return;
                }

                setProductos((prev) => [...prev, producto]);
                Swal.fire("Producto agregado", "", "success").then(async () => {
                    const categoriasDisponibles = await obtenerCategorias();
                    const categoriasFiltradas = categoriasDisponibles.filter(cat => cat.nombre && cat._id);

                    if (!categoriasFiltradas || categoriasFiltradas.length === 0) {
                        Swal.fire("Error", "No se encontraron categorías", "error");
                        return;
                    }

                    const opcionesCategorias = categoriasFiltradas.map(cat => 
                        `<option value="${cat._id}">${cat.nombre}</option>`
                    ).join('');

                    Swal.fire({
                        title: "Actualizar Precio y Categoría",
                        html:
                            '<input id="precio" type="number" placeholder="Precio" class="swal2-input">' +
                            `<select id="categoria" class="swal2-input">${opcionesCategorias}</select>`,
                        focusConfirm: false,
                        showCancelButton: true,
                        confirmButtonText: "Actualizar",
                        cancelButtonText: "Cancelar",
                        preConfirm: () => {
                            const precio = document.getElementById('precio').value;
                            const categoria = document.getElementById('categoria').value;

                            if (precio < 1) {
                                Swal.showValidationMessage('El precio no puede ser negativo o cero');
                                return;
                            }

                            if (!precio && !categoria) {
                                Swal.showValidationMessage('Debe ingresar al menos un valor para actualizar');
                                return;
                            }

                            return { precio, categorias: [categoria] }; 
                        }
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            const { precio, categorias } = result.value;

                            try {
                                const response = await actualizarPrecioYCategoria(producto._id, {
                                    precio,
                                    categorias
                                });

                                setProductos((prev) =>
                                    prev.map((prod) =>
                                        prod._id === producto._id
                                            ? { ...prod, precio, categoria: categorias }
                                            : prod
                                    )
                                );

                                Swal.fire("Actualización exitosa", response.mensaje, "success");
                            } catch (error) {
                                Swal.fire("Error", "No se pudo actualizar el producto", "error");
                            }
                        }
                    });
                });
            } catch (error) {
                Swal.fire("Error", "Producto no encontrado", "error");
            }
        }
    });
};

  
  //agregar manualmente
  const handleAgregarManual = async () => {
  
    const categoriasDisponibles = await obtenerCategorias(); 
    const categoriasFiltradas = categoriasDisponibles.filter(cat => cat.nombre && cat._id);
    const opcionesCategorias = categoriasFiltradas.map(cat => 
      `<option value="${cat._id}">${cat.nombre}</option>`
    ).join('');
  
    Swal.fire({
      title: "Agregar Producto Manualmente",
      html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre">
        <select id="categoria" class="swal2-input">${opcionesCategorias}</select>
        <input id="precio" type="number" class="swal2-input" placeholder="Precio">
        <input id="descripcion" class="swal2-input" placeholder="Descripción">
        <input id="ingredientes" class="swal2-input" placeholder="Ingredientes">
        <input id="pais" class="swal2-input" placeholder="País de Origen">
        <input id="codigoManual" class="swal2-input" placeholder="Código Manual" value="BAR${Date.now()}">
      <div class="w-full p-3 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center">
        <label for="imagen" class="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Seleccionar archivo</label>
        <input id="imagen" type="file" class="hidden">
        <span id="file-name" class="ml-4 text-gray-500">Ningún archivo seleccionado</span>
      </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Agregar",
      cancelButtonText: "Cancelar",
      preConfirm: async () => {
        const nombre = document.getElementById("nombre").value;
        const categoria = document.getElementById("categoria").value;
        const precio = document.getElementById("precio").value;
        const descripcion = document.getElementById("descripcion").value;
        const ingredientes = document.getElementById("ingredientes").value;
        const pais = document.getElementById("pais").value;
        const codigoManual = document.getElementById("codigoManual").value;
        const imagen = document.getElementById("imagen").files[0];
  
        if (!nombre || !categoria || !precio) {
          Swal.showValidationMessage("Por favor completa todos los campos requeridos");
          return;
        }
  
       
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("categoria", categoria); 
        formData.append("precio", precio);
        formData.append("descripcion", descripcion);
        formData.append("ingredientes", ingredientes);
        formData.append("pais", pais);
        formData.append("codigo_de_barras", codigoManual);
        if (imagen) formData.append("imagen", imagen);
  
        try {
          await agregarProducto(formData);
          const productosActualizados = await obtenerProductos();
          setProductos(productosActualizados);
          Swal.fire("Producto agregado", "", "success");
        } catch (error) {
          console.error("Error al agregar el producto:", error);
          Swal.fire("Error", "No se pudo agregar el producto", "error");
        }
      }
    });
  };

  
  //editar producto 
  const abrirModalEditar = (producto) => {
    // Almacena el ID de la categoría en `productoAEditar.categoria`
    setProductoAEditar({ ...producto, categoria: producto.categoria });
    setModalEditarOpen(true);
  };
  
  const handleChangeEditar = (e) => {
    const { name, value, files } = e.target;
  
    setProductoAEditar((prev) => ({
      ...prev,
      [name]: name === "categoria" ? categorias.find(c => c._id === value)?._id : (files ? files[0] : value),
    }));
  };
  
  const handleEditarProducto = async () => {
    // Validaciones
    if (!productoAEditar.precio || productoAEditar.precio <= 0) {
      Swal.fire("Error", "El precio debe ser mayor a cero.", "error");
      return;
    }
  
    const formData = new FormData();
    formData.append("nombre", productoAEditar.nombre);
    formData.append("categoria", productoAEditar.categoria);
    formData.append("precio", productoAEditar.precio);
    formData.append("descripcion", productoAEditar.descripcion);
    formData.append("ingredientes", productoAEditar.ingredientes);
    formData.append("pais", productoAEditar.pais);
  
    if (productoAEditar.imagen instanceof File) {
      formData.append("imagen", productoAEditar.imagen);
    }
  
    // Verifica el contenido de FormData antes de la solicitud
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    try {
      await actualizarProducto(productoAEditar._id, formData);
      Swal.fire("Producto actualizado", "", "success");
      setModalEditarOpen(false);
      const productosActualizados = await obtenerProductos();
      setProductos(productosActualizados);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      Swal.fire("Error", "No se pudo actualizar el producto", "error");
    }
  };
  

//busqueda de productos
const handleBusquedaChange = (e) => {
  setBusqueda(e.target.value);
  setPaginaActual(1);
};

//filtrado por categoria 
const handleCategoriaChange = (e) => {
  setCategoriaSeleccionada(e.target.value);
  setPaginaActual(1); // Reiniciar a la primera página al cambiar la categoría
};



  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Todos los productos</h2>
        <div className="space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleAgregarPorCodigo}>
            + Agregar con Código de Barras
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleAgregarManual}>
            + Agregar Manualmente
          </button>
        </div>
      </div>

      <div className="mb-4 flex space-x-4">
  <div className="relative w-full">
    <input
      type="text"
      placeholder="Buscar por código de barras, nombre"
      value={busqueda}
      onChange={handleBusquedaChange}
      className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <svg
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001a1.007 1.007 0 0 0-.194.195l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85a1.007 1.007 0 0 0-.193-.194zm-5.442 1.528a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
    </svg>
  </div>
  
  <select
  value={categoriaSeleccionada}
  onChange={handleCategoriaChange}
  className="w-full p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="">Todas las categorías</option>
  {categorias.map((categoria) => (
    <option key={categoria._id} value={categoria._id}>
      {categoria.nombre}
    </option>
  ))}
</select>
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
          {productosPaginados.map((producto) => (
            <ProductoRow
              key={producto._id}
              producto={producto}
              eliminarProducto={handleEliminarProducto}
              abrirModalEditar={abrirModalEditar}
            />
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        {renderPaginador()}
      </div>


      <Modal
        isOpen={modalEditarOpen}
        onRequestClose={() => setModalEditarOpen(false)}
        className="bg-white px-10 py-6 rounded shadow max-w-lg mx-auto mt-20 h-[80vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50">
        <h2 className="text-lg font-semibold mb-4">Editar Producto</h2>
        
        <label className="block mb-2 text-blue-600">Nombre</label> {/* Etiqueta con color azul */}
        <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={productoAEditar?.nombre || ""}
            onChange={handleChangeEditar}
            className="w-full mb-4 p-2 border rounded"
        />

        <label className="block mb-2 text-green-600">Categoría</label>
        <select
    name="categoria"
    value={productoAEditar?.categoria || ""}
    onChange={handleChangeEditar}
    className="w-full mb-4 p-2 border rounded"
>
    <option value="">Selecciona una categoría</option>
    {categorias.map((categoria) => (
        <option key={categoria._id} value={categoria._id}>
            {categoria.nombre}
        </option>
    ))}
</select>



        <label className="block mb-2 text-red-600">Precio</label> 
        <input
            type="number"
            name="precio"
            placeholder="Precio"
            value={productoAEditar?.precio || ""}
            onChange={handleChangeEditar}
            className="w-full mb-4 p-2 border rounded"
        />

        <label className="block mb-2 text-yellow-600">Descripción</label> 
        <textarea
            name="descripcion"
            placeholder="Descripción"
            value={productoAEditar?.descripcion || ""}
            onChange={handleChangeEditar}
            className="w-full mb-4 p-2 border rounded h-24"
        />

        <label className="block mb-2 text-purple-600">Ingredientes</label> 
        <textarea
            name="ingredientes"
            placeholder="Ingredientes"
            value={productoAEditar?.ingredientes || ""}
            onChange={handleChangeEditar}
            className="w-full mb-4 p-2 border rounded h-24"
        />

        <label className="block mb-2 text-teal-600">País de Origen</label> 
        <input
            type="text"
            name="pais"
            placeholder="País de Origen"
            value={productoAEditar?.pais || ""}
            onChange={handleChangeEditar}
            className="w-full mb-4 p-2 border rounded"
        />

        <label className="block mb-2 text-indigo-600">Imagen</label> 
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
