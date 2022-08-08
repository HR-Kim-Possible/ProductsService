const db = require('../db/postgres/models.js');
require('dotenv').config();
const express = require('express');
const routes = require('./routes.js');
//require('newrelic');
const morgan = require('morgan');
const path = require('path');
const json = require('json');
const axios = require('axios');

const app = express();

app.use(express.json());

app.use(morgan('tiny'));

app.use('/', routes);

const port = 6246;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

const express_port = process.env.EXPRESSPORT;

app.listen(express_port, () => console.log(`Server running on localhost:${express_port}`));


// receive request from client
// route request from client to controller function based on request method and endpoint
// within controller funtion
  // extract any client-provided values from request url or body
    // extract product_id if needed from request url
    // extract other parameters (resuts/page and starting page) if included in url
    // pass them as parameters to db model function, transaction, or procedure
  //execute appropriate db model function or transaction
    // send response to client
      // if error handle error and send client error status code
      // otherwise send result to client in response
    // optional next
      // like call caching function
      // I think next can also be your err, result callback, just defined elsewhere
        // I think next is the way you do error handling with try and async/await
// within db model function, transaction, or procedure:
  // define const query object (could also do this in subFile query.table.sql) to contain { text: queryStatement, values: [parameters], name: function alias }
  // call query method passing query object as argument, defined in db/index.js
    // import new db connection
    // connection error handled
    // instantiate new pool instance
    // connect to pool
    // get and connect to client
    // client.query
    // release client or end pool
    // handle errror
    // return result.row[0]
      // not sure if results should be sent to client rn or in controller callback
    // think if these steps are even more broken up, can handle errors with more precision

    //(node:52380) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 exit listeners added to [Bus]. Use emitter.setMaxListeners() to increase limit
//(Use `node --trace-warnings ...` to show where the warning was created)