const db  = require('../db/postgres/index.js');
const models = require('../db/postgres/models.js');
const express = require('express');

// export.getAllProducts = async (req, res, next) => {
//   models.queryProducts async (query, err, (err, result) => {
//     if (err) {
//       callback(err)
//     } callback(result)
//   })
//   .then(client =>
//   const { rows } = await postgres.query('SELECT * FROM users WHERE id = $1)
// }
// could make function overheads for addityional parametrers offset and pagination (use key. value tho)
// return as query stream

// module.exports.getProduct = function async (req, res, next) {
//   console.log('query id: ', req.query.ID);
//   const product_id = req.query.ID;
//   const queryString = models.getProducts_statement;
//   const queryParams = [product_id];
//   const queryName =  query_product;
//   const queryObj = {};
//   queryObj.text = queryString;
//   queryObj.values = queryParams
//   queryObj.name = queryName;
//   n.clientQuery(queryObj, (err, result) => {
//     if (err) {
//       console.log('error killed command: ', err, 'parameters: ', queryObj);
//       console.log('error making client query on client :', err.stack);
//       res.status(500).send(err);
//       // resolve(err);
//       next();
//     }
//     console.log('result from clientQuery in controllers: ', result.rows)
//     res.send(result.rows[0]);
//     next();
//   });
//   pool.end();
//   return clients;
// }

//return as query stream

module.exports = {

  getProduct: function (req, res) {
    // console.log('req: ', req);
    // console.log('query id: ', req.params);
    const { product_id } = req.params;
    return models.get_Product(product_id)
      .then(result => res.status(200).send(result.rows[0]))
      .catch((err) => {
        console.log(err);
        res.status(501);
      })
    }

    //   ), (err, result) => {
    //   if (err) {
    //     //next(err)
    //      console.log('error returned from get_Product model to getProduct controller: ', err.stack);
    //      res.status(501);
    //   } else {
    //     console.log('result returned from get_Product model to getProduct controller: ', result);
    //     res.send(result);
    //   }
    // });



  // SEE NOTE RE get_product model working except for HTTP heaaders error. below is the controller I had running with that model.

  // getProduct: function (req, res, next) {
  //   console.log('req: ', req);
  //   console.log('query id: ', req.params);
  //   const { product_id } = req.params;
  //   models.get_Product(product_id, (err, result) => {
  //     if (err) {
  //       //next(err)
  //        console.log('error returned from get_Product model to getProduct controller: ', err.stack);
  //        res.status(501);
  //     } else {
  //       console.log('result returned from get_Product model to getProduct controller: ', result);
  //       res.send(result);
  //     }
  //   });
  //   next();

    //next(pool);
    // db.done();


    // could handle in next function above - controllers is now kind of acting as my transaction
    // except it's not atomic - actually it would be if returning final result

     // send client or err back to next an
    // next(sameClient);
}




//   poov
//   .connect()
//   .then(client => {
//     console.log('client in getProducts controller: ', client);
//     return client
//       .query(query)
//       .then(res => {
//         client.release()
//         console.log(res.rows[0])
//       })
//       .catch(err => {
//         client.release()
//         console.log(err.stack)
//       })
//   })
//   .catch(err => {
//     if err. === kill
//     console.log('error connecting pool in getProduct controller')
//     pool.end()
//     console.log(err.stack)
//   })




// //psql -U postgres
// //'\c database_name;

// // add t

//  //const queryString = models.getProducts_statement;
//   const queryParams = [product_id];
//   const queryName =  query_product;
//   const queryObj = {};
//   queryObj.text = queryString;
//   queryObj.values = queryParams
//   queryObj.name = queryName;
//   db.clientQuery(queryObj, (err, result) => {
//     if (err) {
//       resolve('error getting product info for product id ')
//       console.log('error killed command: ', err, 'parameters: ', queryObj);
//       console.log('error making client query on client :', err.stack);
//       res.status(500).send();
//       // resolve(err);
//       client.release();
//     }
//     console.log('result from clientQuery in controllers: ', result.rows)
//     res.send(result.rows[0]);
//     client.release();
//     next();
//   });
//   pool.end();
//   return client;


    // want to make get_product model prolly perform all queries needed to get all data that needs to be updated when product_id changes
    // and can split up the data here and cache the result data not requested yet
    // so would want 2 or 3 functions runniung asychronously (simulanesouly)
      // each function would be an async function that awaits a db query
      // and then either caches or sends the result
        // so maybe put each function in its own try block, so already have the result data correctly formatted and can have more precision in error handling
        // also since you'll need to checkout multiple clients for the db queries, can just query.pool, but would have to then try and figure out how to return result data from diff clients in a pool to diff places
        // but would be no diff in performance since a pool query doesn't return until all the clients are returned

    // do I also want to cache product_info?

//   if (next) {
//     const nextQuery = models.get_styles
//     const nextParams = [product_id]
//     try {
//       const { rows : stylesRows } = await postgres.query(models.get_styles, [product_id])
//     }
//     (req, res) => {
//       if (error) {
//         next(error)
//       }
//       next(null, result)
//     }
//   }
//   if (error) {
//     next
//   }
//   try {
//     next() const { rows } = await postgres.query(models.get_styles, [product_id])
//     // cache rows[0]
//   } // handle error caching styles

//   .next(
// }

// export.getStyles = async (req, res, next) => {
//   try {
//     const product_id = req.params.id
//     // instead of doing the below functions, return the requested info from the cache
//     // could maybe sommehow notify when caching complete and not begin retrieving the cached data until the notification/mark has happened
//     const { rows } = await postgres.query(models.get_styles), [product_id]
//     res.send(rows[0])
//   } res.status(201).send(error)
// }

// not sure this use of next is correct



