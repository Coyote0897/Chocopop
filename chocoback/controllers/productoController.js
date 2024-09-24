const Producto = require('../models/productos')

const multer = require('multer');
const shortid = require('shortid');

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
