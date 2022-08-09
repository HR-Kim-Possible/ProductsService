//is it better to break connection & credentials into separate module (i.e, ./db/postgres/index.js)?

const models = require('../db/postgres/models.js');

// I somehow deleted my other queries and neither myself nor helpdesk has been able to get them back, (I did commit them at some point, although my commits weren't pushing)
// so I'm rewriting them

module.exports = {

  // getAllProducts:
    // could make function overheads for addityional parametrers offset and pagination (use key. value tho)
    // return as query stream?


  getAllProducts: function(req, res) {
    console.log('request.query in controller: ', req.query);
    let { page, count } = req.query;
    console.log('page in controllers: ', page);
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
    console.log(req);
    const { product_id } = req.params;
    return models.get_Styles(product_id)
      .then(result => res.status(200).send(result.rows[0]))
      .catch((err) => {
        console.log(err);
        res.status(500);
      })
  }

}

  // deal with if product_id is not a number or is outside of range in controller

  // I'LL ASK YOU THE BELOW IN OFFICE HOURS

    // In controllers should I be parsing the errors in controllers and either resolving them or returning different error messages based on the error?
     // How would I go about doing that?

   // Should I include next as a third parameter here if I want to query the same client?
    // when a user clicks a new product, triggering an GET request for the product info,
    // is there a way I could run not only the get_product model,
    // but also the  get_styles, and get_related models (I think it'd have to be sychronously, maybe using next or a Pl/PgSQL transaction?) using one client
    //and then caching the results of the two requests that were not the original GET request,
    // because we know that shortly after we recieve a GET request for products, we will recieve a GET request for styles and a GET request for related













