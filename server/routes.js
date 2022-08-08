const routes = require('express').Router();
const controllers = require('./controllers');


// routes.get('/products', controllers.getAllProducts);

routes.get('/products/:product_id', controllers.getProduct);

// routes.get('/styles', controllers.getStyles);

module.exports = routes;

// once get a get request for a product (b/c that woud be first one to execute upon page re-rendering) execute getProduct controller which will execute a db model for each products api request that is executed when new product_id selected (here, all) and then cache the result data
// when the expresss (app) server recieves a get request to any of the endpoints other than the product_id endpoint, express server will return the appropriate cached data
// this way we can begin the process of querying the db for the queries that we know will need to be run if the getProduct query is called, without waitinbg to recieve an individual get request for eaah endpoint.
// or is react fast enough that react will re-render all the nested components where axios requests are made before we can cache the data returned from the overarching db query and return the appropraite cache for the sub axios request?