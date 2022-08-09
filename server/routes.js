const routes = require('express').Router();
const controllers = require('./controllers');

routes.get('/products', controllers.getAllProducts);

routes.get('/products/:product_id', controllers.getProduct);

routes.get('/products/:product_id/styles', controllers.getStyles);

module.exports = routes;

