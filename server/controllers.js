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

// I somehow deleted my other queries (and my getProduct query that includes features) and neither myself nor helpdesk has been able to get them back, although I did commit them, but my commits weren't pushing as well, so I need to re-write them

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
  }

    // In controllers should I be parsing the errors in controllers and either resolving them or returning different error messages based on the error?
     // How would I go about doing that?
   // Should I include next as a third parameter here if I want to query the same client?













