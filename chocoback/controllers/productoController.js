const Producto = require('../models/productos')

const multer = require('multer');
const shortid = require('shortid');

const axios = require('axios');

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
exports.nuevoProducto = async (req, res,next) =>{

    const producto = new Producto(req.body);
    try {
        if(req.file.filename){
            producto.imagen = req.file.filename
        }
        await producto.save();
        res.json({mensaje: 'se agrego un producto'})
    } catch (error) {
        console.log(error);
        next();
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
exports.actualizarProducto = async(req,res,next)=>{

    try {

        //contruir un nuevo producto
        let nuevoProducto = req.body;

        //verificar si hay imagen nueva
        if(req.file){
            nuevoProducto.imagen = req.file.filename;
        } else {
            let productoAnterior = await Producto.findById(req.params.idProducto);
            nuevoProducto.imagen = productoAnterior.imagen;
        }


        let producto = await Producto.findByIdAndUpdate({_id : req.params.idProducto},
            req.body,{
                new: true
            });
        res.json(producto);

    } catch (error) {
        console.log(error)
        next(error)
    }
}

//Eliminar producto\

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
    const { precio } = req.body;  
    console.log("Código recibido en backend:", codigo); 

    try {
        const productoExistente = await Producto.findOne({ codigo_de_barras: codigo });

        if (productoExistente) {
            return res.status(200).json(productoExistente);
        }

        // Si no está en la base de datos, consultar la API externa
        const response = await axios.get(
            `https://world.openfoodfacts.org/api/v0/product/${codigo}.json`
        );

        if (response.data.status === 1) {
            const producto = response.data.product;
            const nombreCompleto = `${producto.product_name || 'Nombre desconocido'} - 
                                    ${producto.brands || 'Marca desconocida'} - 
                                    ${producto.quantity || 'Cantidad desconocida'}`;

            // Crear un nuevo producto con el 'codigo_de_barras' como atributo
            const nuevoProducto = new Producto({
                nombre: nombreCompleto,
                precio: precio || 0,  
                descripcion: producto.generic_name || 'Descripción no disponible',
                categoria: producto.categories || 'Sin categoría',
                codigo_de_barras: codigo,
                imagen: producto.image_url || 'https://via.placeholder.com/300',
                ingredientes: producto.ingredients_text || 'Ingredientes no disponibles',
                pais: producto.countries || 'No especificado'
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

// Actualizar solo el precio del producto
exports.actualizarPrecioProducto = async (req, res, next) => {
    const { idProducto } = req.params;
    const { precio } = req.body;

    try {
        const producto = await Producto.findByIdAndUpdate(
            idProducto,
            { precio },
            { new: true }
        );

        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.json({ mensaje: 'Precio actualizado correctamente', producto });
    } catch (error) {
        console.error('Error al actualizar el precio:', error);
        next(error);
    }
};
