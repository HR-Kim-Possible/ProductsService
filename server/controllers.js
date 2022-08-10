//is it better to break connection & credentials into separate module (i.e, ./db/postgres/index.js)?

const models = require('../db/postgres/models.js');

module.exports = {


  getAllProducts: function(req, res) {
    let { page, count } = req.query;
    return models.get_AllProducts(page, count)
      .then(result => res.status(200).send(result.rows))
      .catch((err) => {
        console.log(err);
        res.status(500);
      })
  },

  getProduct: function(req, res) {
    const { product_id } = req.params;
    return models.get_Product(product_id)
      .then(result => res.status(200).send(result.rows[0]))
      .catch((err) => {
        console.log(err);
        res.status(500);
      })
  },

  getStyles: function(req, res) {
    const { product_id } = req.params;
    return models.get_Styles(product_id)
      .then(result => res.status(200).send(result.rows))
      .catch((err) => {
        console.log(err);
        res.status(500);
      })
  }

}

  // deal with if product_id is not a number or is outside of range in controller














