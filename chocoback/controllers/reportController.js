const mongoose = require('mongoose');

const getProductosPorCategoria = async (req, res) => {
   try {
      const productosPorCategoria = await mongoose.connection.db
         .collection("productos_por_categoria")  
         .find()
         .toArray();
      res.json(productosPorCategoria);
   } catch (error) {
      res.status(500).send("Error al obtener datos");
   }
};

module.exports = { getProductosPorCategoria };
