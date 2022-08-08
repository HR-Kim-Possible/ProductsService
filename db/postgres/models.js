// const pool = require('./index.js');
// const client = require('./index.js');
// const db = require('./index.js');
// const pool = require('./index.js').pool;

/* MIGHT WANT TO USE PL/PGSQL TO INCREASE PERFORMANCE */

const { Pool } = require('pg');
const pgp = require('pg-promise')();
require('dotenv').config();

const credentials = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
};

const pool = new Pool(credentials);
//pool.connect(() => 'postgres connected');
//const client = new Client(credentials);

//const { Pool, Client } = require('pg');

// create or replace function get_product(
//   inout p.product_id integer,
//   inout
//   inout name products.product_name%type,
//   inout slogan products.slogan%type,
//   inout description products.product_description%type,
//   inout category products.category%type,
//   inout default_price products.default_price%type
// )
// returns record
// language plpgsql
// as $$
// begin
//   select

//     product_name into name
//     slogan into slogan
//     product_description into description
//     category into category
//     default_price into default_price
//   into name, slogan, description, category, default_price
//   from products
//   where id = p.product_id

//   if not found then
//     raise 'Products records with id % not found', p.product_id;
//   end if;

//   return product_info;

// end;
// $$

// ^^ using pl/pgsql

/* can make two more overlay functions fo the possibility of 2 or 3 parameters*/

// select get_product($1 integer)

// PRODUCTS:*/

//'SELECT p.product_id AS id, product_name AS "name", slogan, product_description AS "description", category, default_price FROM products p WHERE product_id = $1 ORDER BY id ASC LIMIT 5 OFFSET 0;'
//(JSON_BUILD_OBJECT(feature, f.feature, "value", f.value) GROUP BY feature_id)
//JSON_BUILD_OBJECT('url', ph.photo_url , thumbnail_url, ph.thumbnail_url) AS photos
      //GROUP BY photo_id)
      SELECT p.product_id AS id, product_name AS "name", slogan, product_description AS "description", category, default_price, ARRAY_AGG (JSON_BUILD_OBJECT(feature, f.feature_name, "value", f.feature_value) GROUP BY feature_id) FROM products p LEFT JOIN features f USING(product_id) WHERE product_id = $1;

select p.product_id AS id, product_name as "name", array_agg (f.feature_name, f.feature_value) group by product_id as features from products p left join features f using(product_id_ where product_id = 1;

module.exports = {
  get_Product: function(id) {
    const getProducts_statement = 'SELECT p.product_id AS id, product_name AS "name", slogan, product_description AS "description", category, default_price, ARRAY_AGG (f.feature_name, f.feature_value) features FROM products p LEFT JOIN features f USING(product_id) WHERE product_id = $1;'
    id = Number(id);
    const  queryObj = {
      text: getProducts_statement,
      values: [id],
      name: null
     };
    return pool.query(queryObj)
  }
}


// THE BELOW MODLE IS WORKING, EXCEPT I AM GETTING ERROR (code: 'ERR_HTTP_HEADERS_SENT' Cannot set headers after they are sent to the client on node: node:_http_outgoing:576.) (I am not catching the error.) I THINK WHEN TRYING TO SEND THE RESULT IN CONTROLLERS.
// SO MY RESULT IS GETTING TO CONTROLLERS, BUT WWITH MAYBE EXTRA INFORMATION WHEN I WANT TO FORMAT IT?
// I THINK I'M HAVING A PROBLEM WITH MY MIX OF CALLBACKS AND PROMISES AND AM GOING TO TRY ONLY USING PROMISES
// IN REALITY, SHOULD PROBABLY USE ASYNC/AWAIT AS THE MOST CURRENT APPROACH

// module.exports.get_Product = function(id, callback) {
//   const getProducts_statement = 'SELECT product_id AS id, product_name AS "name", slogan, product_description AS "description", category, default_price FROM products p WHERE product_id = $1 ORDER BY id ASC LIMIT 5 OFFSET 0;'
//   id = Number(id);
//   console.log('id after converting to number: ', id);
//   const  queryObj = {
//     text: getProducts_statement,
//     values: [id],
//     name: null
//    };
//   // might want to return query obj here and move async functions to index (so muliiple cns be run totherh - like onr cleint from pool querying product, one querying styles, and one queriyubg related )
//     // or even one client querying all 3
//   // related would be a recursive quwry if wewanted to return all rth reqaltedeid
//   console.log('pool from models: ', pool, 'db from model: ', pool);
//   // pool
//   // .connect()
//   // .catch(err => console.log('error aquiring client in get_Product model: ', err.stack))
//   // .then(client => {
//   //   console.log('client in getProducts controller: ', client);
//   //   return client
//     pool
//     .connect()
//     .then((client) => (
//       client
//       .query(queryObj, function(err, result) {
//         if (err) {
//           console.log('query object in error: ', queryObj);
//           console.log('error calling query method on client in get_Product model in callback: ', err);
//           callback(err)
//         }
//         console.log('query object in callback: ', queryObj);
//         console.log(`result obj from get_Product model query callback with product id as ${id}: `, result);
//         console.log(`result row from get_Product model query callback with product id as ${id}: `, result.rows[0]);
//         callback(null, result.rows[0])
//       })
//       .then((res) => {
//           console.log('query object in then: ', queryObj);
//           console.log(`result obj from get_Product model with product id as ${id}: `, res);
//           console.log(`result row from get_Product model with product id as ${id}: `, res.rows[0]);
//           callback(null, res.rows[0]);
//           client.release(() => console.log('client released after query with query onbject', 'client; ', client, 'pool: ', pool, 'queryObj: ', queryObj))
//         })
//       .catch((err) => {
//         console.log('query object in catch: ', queryObj);
//         console.log('error calling query method on client in get_Product model: ', err);
//         client.release(() => console.log('client released after query with query onbject: ', 'client; ', client, 'pool: ', pool, 'queryObj: ', queryObj))
//         })

//         //return result
//       // could include a collecton of queries here if I want
//     ))
//     .catch(err => console.log('catch all error in getProduct controller: ', err.stack))
//    //  if err. === kill

//     // .then(console.log('pool ended inside catch all error: ', pool))
//     // .catch('pool not ended', err.stack, 'pool: ', pool)

//   //return;
// };

// prolly should switch from .then and .catch b/c if every subsequent call is not a promise of thenable, a .then migth execute without waiting for thr preceeding promise to resolve or reject
// I think asyn/await doesn't have this issue
// can also maybe designate reject and resolve values without using try statements - which would make the code more readabel




//psql -U postgres
//'\c database_name;

// add t

 //const queryString = models.getProducts_statement;
  // const queryParams = [product_id];
  // const queryName =  query_product;
  // const queryObj = {};
  // queryObj.text = queryString;
  // queryObj.values = queryParams
  // queryObj.name = queryName;
  // db.clientQuery(queryObj, (err, result) => {
  //   if (err) {
  //     console.log('error killed command: ', err, 'parameters: ', queryObj);
  //     console.log('error making client query on client :', err.stack);
  //     res.status(500).send();
  //     // resolve(err);
  //     client.release();
  //   }
  //   console.log('result from clientQuery in controllers: ', result.rows)
  //   res.send(result.rows[0]);
  //   client.release();
  //   next();
  // });
  // pool.end();
  // return client;






// exports.

// SELECT get_products(products) AS results
//   FROM */


