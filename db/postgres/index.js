/* MIGHT WANT TO USE PL/PGSQL TO INCREASE PERFORMANCE */

// const { Pool, Client } = require('pg');
// const pgp = require('pg-promise')();
// require('dotenv').config();

// const credentials = {
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
// };

// const pool = new Pool(credentials);
// const client = new Client(credentials);


//     // tests connection and returns Postgres server version,
    // if successful; or else rejects with connection error:
  //   function testConnection async () =>  {
  //     const c = await productsdb.connect(); // try to connect
  //     c.done(); // success, release connection
  //     return c.client.serverVersion; // return server version
  // } // pool connects to the database for ypu

// clientQuery = async (queryObj, callback) => {
//       const start = Date.now()
//       try {
//         const client = await pool.connect();
//         return client;
//       } catch(err) {
//         console.error('Error acquiring client', err.stack);
//       }
//       try {
//         const { res } = await client.query(queryObj)
//         console.log('res after client query finished executing: ', res);
//         client.release()
//         callback(null, res)
//         // return client?

//       } catch(err) {
//         client.release();
//         console.error('Error executing query', err.stack);
//         callback(err);
//       }
//       pool.end().then(() => console.log('pool has ended'));
//       return res;
//       // what returning

//     // tests connection and returns Postgres server version,
//     // if successful; or else rejects with connection error:
//   // function testConnection async () =>  {
//   //     const c = await productsdb.connect(); // try to connect
//   //     c.done(); // success, release connection
//   //     return c.client.serverVersion; // return server version
//   // }
// }




//     pool.connect((err, client, release) => {
//       if (err) {
//         return console.error('Error acquiring client', err.stack)
//       }
//       client.query('SELECT NOW()', (err, result) => {
//         release()
//         if (err) {
//           return console.error('Error executing query', err.stack)
//         }
//         console.log(result.rows)
//       })
//     })
//   }
// }.queryClient = (model)
//   const query =


// pool
//   .connect()
//   .then(client => {
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
//     pool.end()
//     console.log(err.stack)
//   })




//psql -U postgres
//'\c database_name;

// add try to catch errors
//(but need to catch erros after any checkouted clients have been returned,
//otherwise will lose the client)

// module.exports = {
//   pool: pool,
//   client: client
// };

// module.export default db;









