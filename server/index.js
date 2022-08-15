require('dotenv').config();
const express = require('express');
const routes = require('./routes.js');
const morgan = require('morgan');
const json = require('json');
const axios = require('axios');

const app = express();

app.use(express.json());

app.use(morgan('tiny'));

app.use('/', routes);

app.listen(process.env.EXPORT, () => {
  console.log(`listening at http://localhost:${process.env.EXPORT}`);
});





