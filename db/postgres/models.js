// would it be better for me to separate out the connection and credentials into a different module (e.g., ./db/postgres/index.js)?

const { Pool } = require('pg');
require('dotenv').config();

const credentials = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
};

// I think he credentials above are using the default values set in .env, but I need them to use my environment values

const pool = new Pool(credentials);

// if I were to use pool.connect(client => client.query) would I connect the pool inside each model function, or outside?

module.exports = {
  get_Product: function(id) {
    const getProducts_statement = `SELECT p.product_id AS id, product_name AS "name", slogan, product_description AS "description", category, default_price, ARRAY_AGG(JSONB_BUILD_OBJECT('feature', feature_name, 'value', feature_value)) AS features FROM products p LEFT JOIN features f USING(product_id) WHERE product_id = $1 GROUP BY product_id;`
    id = Number(id);
    const  queryObj = {
      text: getProducts_statement,
      values: [id],
      name: null
     };
    return pool.query(queryObj)
  }
}

// should I simply be returning the result of pool.query here or should I try to catch some errors here as well?
// is it better to use async/await?




