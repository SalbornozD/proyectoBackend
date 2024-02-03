const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const http = require('http');
const socketIO = require('socket.io');
const productRoutes = require('./src/routes/productRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const ProductManager = require('./src/ProductManager');
const CartManager = require('./src/CartManager');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = 8080;

const productManager = new ProductManager();
const cartManager = new CartManager();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.json());

app.use('/api/products', productRoutes); 
app.use('/api/carts', cartRoutes);       

app.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', { products });
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('crearProducto', (producto) => {
        productManager.addProduct(producto); // Utiliza la instancia de ProductManager

        io.emit('actualizarProductos', productManager.getProducts());
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

io.of('/carts').on('connection', (socket) => {
    console.log('Usuario conectado a la sección de carritos');

    socket.on('crearCarrito', (carrito) => {
        cartManager.createCart(carrito); // Utiliza la instancia de CartManager

        io.of('/carts').emit('actualizarCarritos', cartManager.getCarts());
    });

    socket.on('agregarProductoAlCarrito', ({ cartId, productId, quantity }) => {
        try {
            cartManager.addProductToCart(cartId, productId, quantity); // Utiliza la instancia de CartManager

            io.of('/carts').emit('actualizarCarritos', cartManager.getCarts());
        } catch (error) {
            socket.emit('error', { message: error.message });
        }
    });


    socket.on('disconnect', () => {
        console.log('Usuario desconectado de la sección de carritos');
    });
});

server.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});