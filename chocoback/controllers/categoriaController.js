const Categoria = require('../models/categoria');

// Obtener todas las categorías
exports.obtenerCategorias = async (req, res, next) => {
    try {
        const categorias = await Categoria.find();
        res.json(categorias);
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        next(error);
    }
};

// Obtener una categoría por ID
exports.obtenerCategoria = async (req, res, next) => {
    try {
        const categoria = await Categoria.findById(req.params.idCategoria);
        if (!categoria) {
            return res.status(404).json({ mensaje: 'La categoría no existe' });
        }
        res.json(categoria);
    } catch (error) {
        console.error('Error al obtener la categoría:', error);
        next(error);
    }
};

// Crear una nueva categoría
exports.nuevaCategoria = async (req, res, next) => {
    const categoria = new Categoria(req.body);
    try {
        await categoria.save();
        res.status(201).json({ mensaje: 'Categoría creada con éxito', categoria });
    } catch (error) {
        console.error('Error al crear la categoría:', error);
        next(error);
    }
};

// Actualizar una categoría existente
exports.actualizarCategoria = async (req, res, next) => {
    try {
        const categoria = await Categoria.findByIdAndUpdate(
            req.params.idCategoria,
            req.body,
            { new: true }
        );

        if (!categoria) {
            return res.status(404).json({ mensaje: 'La categoría no existe' });
        }

        res.json({ mensaje: 'Categoría actualizada correctamente', categoria });
    } catch (error) {
        console.error('Error al actualizar la categoría:', error);
        next(error);
    }
};

// Eliminar una categoría
exports.eliminarCategoria = async (req, res, next) => {
    try {
        const categoria = await Categoria.findByIdAndDelete(req.params.idCategoria);
        if (!categoria) {
            return res.status(404).json({ mensaje: 'La categoría no existe' });
        }

        res.json({ mensaje: 'La categoría ha sido eliminada' });
    } catch (error) {
        console.error('Error al eliminar la categoría:', error);
        next(error);
    }
};
