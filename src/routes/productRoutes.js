const express = require('express');
const ProductManager = require('../ProductManager');

const router = express.Router();
const productManager = new ProductManager();

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts(limit);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la lista de productos.' });
    }
});

// Obtener un producto por su ID
router.get('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        const product = await productManager.getProductById(productId);
        if (product !== "Not found") {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto.' });
    }
});

// Agregar un nuevo producto
router.post('/', async (req, res) => {
    try {
        const newProduct = req.body;
        await productManager.addProduct(newProduct);
        res.status(201).json({ message: 'Producto agregado correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Actualizar un producto por su ID
router.put('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        const updatedProduct = req.body;
        await productManager.updateProduct(productId, updatedProduct);
        res.json({ message: 'Producto actualizado correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar un producto por su ID
router.delete('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        await productManager.deleteProduct(productId);
        res.json({ message: 'Producto eliminado correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
