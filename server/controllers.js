//is it better to break connection & credentials into separate module (i.e, ./db/postgres/index.js)?

const models = require('../db/postgres/models.js');
const express = require('express'); // test - pretty sure I don't need this

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
    const { product_id } = req.params;
    return models.get_Product(product_id)
      .then(result => res.status(200).send(result.rows[0]))
      .catch((err) => {
        console.log(err);
        res.status(501);
      })
    }

    // In controllers should I be parsing the errors in controllers and either resolving them or returning different error messages based on the error?
     // How would I go about doing that?
   // Should I include next as a third parameter here if I want to query the same client?













