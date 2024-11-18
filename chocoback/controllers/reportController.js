const mongoose = require('mongoose');
const Categoria = require('../models/categoria');

// Obtener productos por categoría
exports.getProductosPorCategoria = async (req, res, next) => {
   try {
      const productosPorCategoria = await mongoose.connection.db
         .collection("productos_por_categoria")
         .find()
         .toArray();

      const categoriaIds = productosPorCategoria.map(item => item._id[0]);

      const categorias = await Categoria.find({ _id: { $in: categoriaIds } });

      const categoriaMap = categorias.reduce((acc, categoria) => {
         acc[categoria._id] = categoria.nombre;
         return acc;
      }, {});

      const productosConNombreCategoria = productosPorCategoria.map(item => ({
         nombreCategoria: categoriaMap[item._id[0]] || "Sin categoría",
         totalProductos: item.totalProductos,
      }));

      res.json(productosConNombreCategoria);
   } catch (error) {
      console.error("Error al obtener datos de la vista:", error);
      next(error);
   }
};

// Obtener ventas por día del mes
exports.obtenerVentasPorDiaDelMes = async (req, res, next) => {
   const { mes, anio } = req.query;

   try {
      const ventasPorDia = await mongoose.connection.db
         .collection('ventasPorDia')
         .find({ mes: parseInt(mes), anio: parseInt(anio) })
         .toArray();

      res.status(200).json(ventasPorDia);
   } catch (error) {
      console.error("Error al obtener ventas por día:", error);
      next(error);
   }
};

// Obtener ventas por método de pago
exports.obtenerVentasPorMetodoPago = async (req, res, next) => {
   try {
      const ventasPorMetodo = await mongoose.connection.db
         .collection('ventasPorMetodoPago')
         .find()
         .toArray();

      res.status(200).json(ventasPorMetodo);
   } catch (error) {
      console.error("Error al obtener ventas por método de pago:", error);
      next(error);
   }
};
