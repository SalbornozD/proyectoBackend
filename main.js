class Producto{
    static contadorProducto = 0

    constructor(title, description, price, thumbnail, code, stock){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = ++Producto.contadorProducto
    }
}

class ProductManager{
    constructor(){
        this.productos = []
    }

    getProducts(){
        return this.productos;
    }

    getProductsById(identificador){
        for (const productoAux of this.productos) {
            if(productoAux.id == identificador){
                return productoAux
            }
        }
        return "Not found"
    }

    addProduct(title, description, price, thumbnail, code, stock){
        let existeProducto = false
        this.productos.forEach(productoAux => {
            if(productoAux.code == code){
                existeProducto = true
            }
        });
        if(!existeProducto){
            let productoAux = new Producto(title, description, price, thumbnail, code, stock)
            this.productos.push(productoAux)
        } else {
            console.log("Error: Ya existe un producto con ese codigo (code)")
        }
    }
}

//const productManager = new ProductManager()
//console.log(productManager.getProducts())
//productManager.addProduct("Producto prueba", "Este es un producto prueba", 2000, "Sin imagen", "abc123", 25)
//console.log(productManager.getProducts())
//productManager.addProduct("Producto prueba", "Este es un producto prueba", 2000, "Sin imagen", "abc123", 25)
//console.log(productManager.getProductsById(1))
//console.log(productManager.getProductsById(2))