const fs = require('fs').promises;

class CartManager {
    constructor(filePath = './carrito.json') {
        this.path = filePath;
        this.carts = [];
        this.loadCarts();
    }

    async loadCarts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            this.carts = JSON.parse(data);
        } catch (error) {
            this.carts = [];
        }
    }

    async saveCarts() {
        const data = JSON.stringify(this.carts, null, 2);
        await fs.writeFile(this.path, data, 'utf-8');
    }

    async createCart(newCart) {
        await this.loadCarts();

        const cartWithSameId = this.carts.find(cart => cart.id === newCart.id);
        if (cartWithSameId) {
            throw new Error("Error: Ya existe un carrito con ese ID");
        }

        this.carts.push(newCart);
        await this.saveCarts();
    }

    async getCart(cartId) {
        await this.loadCarts();
        const cart = this.carts.find(cart => cart.id === cartId);
        return cart || "Not found";
    }

    async addProductToCart(cartId, productId, quantity) {
        await this.loadCarts();

        const cart = this.carts.find(cart => cart.id === cartId);
        if (!cart) {
            throw new Error("Error: Carrito no encontrado");
        }

        const existingProduct = cart.products.find(product => product.id === productId);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ id: productId, quantity });
        }

        await this.saveCarts();
    }
}

module.exports = CartManager;
