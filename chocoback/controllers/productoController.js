const Producto = require('../models/productos')
const Categoria = require('../models/categoria')


const multer = require('multer');
const shortid = require('shortid');
const axios = require('axios');

//traduccion
const { traducirTexto } = require('../helpers/translateHelper');

// Configuración de multer para subir archivos
const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'));
        }
    }
};

const upload = multer(configuracionMulter).single('imagen')


exports.subirArchivo = (req, res, next) =>{
    upload(req, res, function(error){
        if (error){
            res.json({mensaje: error})
        }
        return next()
    })
}


//agregar Producto
exports.nuevoProducto = async (req, res, next) => {
    try {
        const producto = new Producto(req.body);

        if (req.file && req.file.filename) {
            producto.imagen = req.file.filename;
        }

        if (req.body.categoria) {
            const categoriaId = req.body.categoria; 
            const categoriaExistente = await Categoria.findById(categoriaId);

            if (!categoriaExistente) {
                return res.status(400).json({ mensaje: 'La categoría seleccionada no existe' });
            }

            producto.categoria = categoriaId;
        }

       
        await producto.save();
        res.status(201).json({ mensaje: 'Se agregó un producto exitosamente', producto });
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        next(error);
    }
};

//obtener Productos
exports.obtenerProductos = async (req,res,next) =>{
    try {
        const producto = await Producto.find()
        res.json(producto)
    } catch (error) {
        console.log(error)
        next(error)
        
    }
}
//obtener Producto
exports.obtenerProducto = async (req,res,next) =>{
    const producto = await Producto.findById(req.params.idProducto)
    if(!producto){
        res.json({mensaje: 'el producto no existe'})
    }
    //motrar usuario
    res.json(producto)
}

//actualizar producto
exports.actualizarProducto = async (req, res, next) => {
    try {
      let nuevoProducto = req.body;
  
      if (req.file) {
        nuevoProducto.imagen = req.file.filename;
      } else {
        let productoAnterior = await Producto.findById(req.params.idProducto);
        nuevoProducto.imagen = productoAnterior.imagen;
      }
  
      if (nuevoProducto.categoria) {
        const categoriaEncontrada = await Categoria.findOne({ _id: nuevoProducto.categoria });
        if (!categoriaEncontrada) {
          return res.status(400).json({ mensaje: 'La categoría especificada no existe' });
        }
      }
  
      const productoActualizado = await Producto.findByIdAndUpdate(
        req.params.idProducto,
        nuevoProducto,
        { new: true }
      );
  
      res.json(productoActualizado);
  
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      res.status(500).json({ mensaje: 'Error al actualizar el producto', error: error.message });
    }
  };
  
  


//Eliminar producto

exports.eliminarProducto = async (req,res,next)=>{
try {
    await Producto.findByIdAndDelete({_id : req.params.idProducto});
    res.json({mensaje: 'el Producto ha sido eliminado'})

} catch (error) {
    console.log(error)
    next(error)
}


};



// Obtener productos por código
exports.obtenerProductoPorCodigo = async (req, res) => {
    const { codigo } = req.params;
    const { precio, categorias } = req.body; 
    console.log("Código recibido en backend:", codigo);

    try {
        const productoExistente = await Producto.findOne({ codigo_de_barras: codigo }).populate('categoria');

        if (productoExistente) {
            return res.status(200).json(productoExistente);
        }

        const response = await axios.get(
            `https://world.openfoodfacts.org/api/v0/product/${codigo}.json`
        );

        if (response.data.status === 1) {
            const producto = response.data.product;

            const obtenerPrimerPais = (cadena) => {
                if (!cadena) return "No especificado";
                const paises = cadena.split(",");
                return paises.length > 1 ? `${paises[0]} ` : paises[0];
            };

            const pais = obtenerPrimerPais(
                producto.manufacturing_places ||
                producto.countries_imported ||
                producto.countries ||
                producto.countries_hierarchy
            );

            const nombreCompleto = `${producto.product_name} - 
                                    ${producto.brands } - 
                                    ${producto.quantity}`;

            // Usar la función de traducción del helper
            const descripcionTraducida = await traducirTexto(producto.generic_name || 'Descripción no disponible');
            const ingredientesTraducidos = await traducirTexto(producto.ingredients_text || 'Ingredientes no disponibles');

            // Buscar o crear categorías y obtener sus IDs
            const categoriasIDs = [];
            if (categorias && categorias.length > 0) {
                for (const nombreCategoria of categorias) {
                    let categoria = await Categoria.findOne({ nombre: nombreCategoria.trim() });
                    if (!categoria) {
                        categoria = new Categoria({ nombre: nombreCategoria.trim(), descripcion: '' });
                        await categoria.save();
                    }
                    categoriasIDs.push(categoria._id);
                }
            }

            const nuevoProducto = new Producto({
                nombre: nombreCompleto,
                precio: precio || 0,
                descripcion: descripcionTraducida,
                categoria: categoriasIDs,
                codigo_de_barras: codigo,
                imagen: producto.image_url || 'https://via.placeholder.com/300',
                ingredientes: ingredientesTraducidos,
                pais: pais
            });

            await nuevoProducto.save();
            return res.status(201).json(nuevoProducto);
        } else {
            return res.status(404).json({ mensaje: 'Producto no encontrado en la API' });
        }
    } catch (error) {
        console.error('Error al conectar con la API:', error.message);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};


//agregar precio y categoria 
exports.actualizarPrecioYCategoria = async (req, res, next) => {
    const { idProducto } = req.params;
    const { precio, categorias } = req.body;

    try {
        let producto = await Producto.findById(idProducto);
        if (!producto) {
            return res.status(404).json({ mensaje: 'El producto no existe' });
        }

        producto.precio = precio || producto.precio;

        // Asegúrate de que las categorías ya existan en la base de datos antes de asignarlas
        if (categorias && categorias.length > 0) {
            const categoriasExistentes = await Categoria.find({ _id: { $in: categorias } });
            if (categoriasExistentes.length !== categorias.length) {
                return res.status(400).json({ mensaje: 'Una o más categorías no existen' });
            }
            producto.categoria = categorias.map(cat => categoriasExistentes.find(c => c._id.equals(cat))._id);
        }

        await producto.save();

        res.status(200).json({ mensaje: 'Precio y categorías actualizados', producto });
    } catch (error) {
        console.error('Error al actualizar precio y categoría:', error);
        next(error);
    }
};

// Obtener todas las categorías

exports.obtenerProductosPorNombreCategoria = async (req, res, next) => {
    const { nombreCategoria } = req.params;
  
    try {
      // Buscar la categoría por nombre
      const categoria = await Categoria.findOne({ nombre: nombreCategoria });
      if (!categoria) {
        return res.status(404).json({ mensaje: 'La categoría no existe' });
      }
  
      // Usar el _id de la categoría encontrada para buscar los productos
      const productos = await Producto.find({ categoria: categoria._id }).populate('categoria');
      if (productos.length === 0) {
        return res.status(404).json({ mensaje: 'No se encontraron productos para esta categoría' });
      }
  
      res.status(200).json(productos);
    } catch (error) {
      console.error('Error al obtener productos por nombre de categoría:', error);
      next(error);
    }
  };



