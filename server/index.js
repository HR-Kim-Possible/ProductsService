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

const port = 6246;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});



