const http = require('http');
const express = require('express');
require('./db/mongoose');

/* Routes */
const index = require('./routes/index');

/* Middleware */
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());

http.createServer(app);

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type',
  );
  next();
});

app.use(index);

app.use(errorHandler);

module.exports = app;
