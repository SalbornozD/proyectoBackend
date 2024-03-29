const express = require('express');
const CartManager = require('../CartManager');
const router = express.Router();
const cartManager = new CartManager();

router.post('/', async (req, res) => {
    try {
        const newCart = req.body;
        await cartManager.createCart(newCart);

        io.emit('actualizarCarritos', await cartManager.getAllCarts());
        
        res.status(201).json({ message: 'Carrito creado correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartManager.getCart(cartId);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el carrito.' });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity || 1; // Default quantity to 1 if not provided
        await cartManager.addProductToCart(cartId, productId, quantity);

        io.emit('actualizarCarritos', await cartManager.getAllCarts());

        res.json({ message: 'Producto agregado al carrito correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
