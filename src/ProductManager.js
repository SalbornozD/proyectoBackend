const fs = require('fs').promises;

class ProductManager {
    constructor(filePath = './productos.json') {
        this.path = filePath;
        this.productos = [];
        this.loadProducts();
    }

    async loadProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            this.productos = JSON.parse(data);
        } catch (error) {
            this.productos = [];
        }
    }

    async saveProducts() {
        const data = JSON.stringify(this.productos, null, 2);
        await fs.writeFile(this.path, data, 'utf-8');
    }

    async getProducts(limit) {
        await this.loadProducts();
        return limit ? this.productos.slice(0, limit) : this.productos;
    }

    async getProductById(identificador) {
        await this.loadProducts();
        const producto = this.productos.find(productoAux => productoAux.id == identificador);
        return producto ? producto : "Not found";
    }

    async addProduct(productoData) {
        await this.loadProducts();

        const existeProducto = this.productos.some(productoAux => productoAux.code == productoData.code);

        if (!existeProducto) {
            const nuevoProducto = {
                id: this.productos.length + 1,
                ...productoData
            };

            this.productos.push(nuevoProducto);
            await this.saveProducts();
        } else {
            throw new Error("Error: Ya existe un producto con ese código (code)");
        }
    }

    async updateProduct(id, updatedProduct) {
        await this.loadProducts();

        const index = this.productos.findIndex(productoAux => productoAux.id == id);

        if (index !== -1) {
            this.productos[index] = {
                ...this.productos[index],
                ...updatedProduct,
                id: id // No se debe borrar el ID
            };

            await this.saveProducts();
        } else {
            throw new Error("Error: Producto no encontrado");
        }
    }

    async deleteProduct(id) {
        await this.loadProducts();

        const index = this.productos.findIndex(productoAux => productoAux.id == id);

        if (index !== -1) {
            this.productos.splice(index, 1);
            await this.saveProducts();
        } else {
            throw new Error("Error: Producto no encontrado");
        }
    }
}

module.exports = ProductManager;