const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./src/routes/productRoutes');
const cartRoutes = require('./src/routes/cartRoutes');

const app = express();
const port = 8080;

app.use(bodyParser.json());

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});