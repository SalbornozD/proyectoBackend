const express = require('express');
const CartManager = require('../CartManager');

const router = express.Router();
const cartManager = new CartManager();

// Crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const newCart = req.body;
        await cartManager.createCart(newCart);
        res.status(201).json({ message: 'Carrito creado correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener productos de un carrito por su ID
router.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartManager.getCart(cartId);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el carrito.' });
    }
});

// Agregar un producto al carrito por su ID
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity || 1; // Default quantity to 1 if not provided
        await cartManager.addProductToCart(cartId, productId, quantity);
        res.json({ message: 'Producto agregado al carrito correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
