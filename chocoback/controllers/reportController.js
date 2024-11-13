const mongoose = require('mongoose');
const Categoria = require('../models/categoria');

const getProductosPorCategoria = async (req, res) => {
   try {
      const productosPorCategoria = await mongoose.connection.db
         .collection("productos_por_categoria")
         .find()
         .toArray();

      // Obtener los IDs de categorías
      const categoriaIds = productosPorCategoria.map(item => item._id[0]);

      // Consultar los nombres de las categorías
      const categorias = await Categoria.find({ _id: { $in: categoriaIds } });

      // Crear un objeto de mapeo de { id: nombre }
      const categoriaMap = categorias.reduce((acc, categoria) => {
         acc[categoria._id] = categoria.nombre;
         return acc;
      }, {});

      // Asignar el nombre de la categoría en lugar del ID
      const productosConNombreCategoria = productosPorCategoria.map(item => ({
         nombreCategoria: categoriaMap[item._id[0]] || "Sin categoría",
         totalProductos: item.totalProductos,
      }));

      res.json(productosConNombreCategoria);
   } catch (error) {
      console.error("Error al obtener datos de la vista:", error);
      res.status(500).send("Error al obtener datos");
   }
};

const obtenerVentasPorDiaDelMes = async (req, res) => {
   const { mes, anio } = req.query;  // Cambié "año" a "anio"

   try {
      const ventasPorDia = await mongoose.connection.db.collection('ventas').aggregate([
         {
            "$match": {
               "fecha": {
                  "$gte": new Date(`${anio}-${mes}-01`),
                  "$lt": new Date(`${anio}-${mes}-31`)
               }
            }
         },
         {
            "$group": {
               "_id": {
                  "day": { "$dayOfMonth": "$fecha" }
               },
               "totalVentasDia": { "$sum": "$total" }
            }
         },
         {
            "$sort": { "_id.day": 1 }
         },
         {
            "$project": {
               "_id": 0,
               "dia": "$_id.day",
               "totalVentasDia": 1
            }
         }
      ]).toArray();

      res.status(200).json(ventasPorDia);
   } catch (error) {
      console.error("Error al obtener ventas por día:", error);
      res.status(500).json({ mensaje: "Error al obtener ventas por día" });
   }
};




module.exports = { getProductosPorCategoria,obtenerVentasPorDiaDelMes };