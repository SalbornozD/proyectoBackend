const fs = require('fs');

class ProductManager {
    constructor(filePath = './productos.json') {
        this.path = filePath;
        this.productos = [];
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.productos = JSON.parse(data);
        } catch (error) {
            this.productos = [];
        }
    }

    saveProducts() {
        const data = JSON.stringify(this.productos, null, 2);
        fs.writeFileSync(this.path, data, 'utf-8');
    }

    getProducts() {
        this.loadProducts();
        return this.productos;
    }

    getProductById(identificador) {
        this.loadProducts();
        const producto = this.productos.find(productoAux => productoAux.id == identificador);
        return producto ? producto : "Not found";
    }

    addProduct(productoData) {
        this.loadProducts();

        const existeProducto = this.productos.some(productoAux => productoAux.code == productoData.code);

        if (!existeProducto) {
            const nuevoProducto = {
                id: this.productos.length + 1,
                ...productoData
            };

            this.productos.push(nuevoProducto);
            this.saveProducts();
        } else {
            console.log("Error: Ya existe un producto con ese código (code)");
        }
    }

    updateProduct(id, updatedProduct) {
        this.loadProducts();

        const index = this.productos.findIndex(productoAux => productoAux.id == id);

        if (index !== -1) {
            this.productos[index] = {
                ...this.productos[index],
                ...updatedProduct,
                id: id // No se debe borrar el ID
            };

            this.saveProducts();
        } else {
            console.log("Error: Producto no encontrado");
        }
    }

    deleteProduct(id) {
        this.loadProducts();

        const index = this.productos.findIndex(productoAux => productoAux.id == id);

        if (index !== -1) {
            this.productos.splice(index, 1);
            this.saveProducts();
        } else {
            console.log("Error: Producto no encontrado");
        }
    }
}

// Código de prueba
//const productManager = new ProductManager();
//console.log(productManager.getProducts());

//const nuevoProducto = {
//    title: 'producto prueba',
//    description: 'Este es un producto prueba',
//    price: 200,
//    thumbnail: 'Sin imagen',
//    code: 'abc123',
//    stock: 25
//};

//productManager.addProduct(nuevoProducto);

//console.log(productManager.getProducts());

//const idProducto = 1;
//console.log(productManager.getProductById(idProducto));

//const productoActualizado = {
//    description: 'Producto actualizado con éxito',
//    price: 250
//};

//productManager.updateProduct(idProducto, productoActualizado);

//console.log(productManager.getProducts());

//productManager.deleteProduct(idProducto);

//console.log(productManager.getProducts());