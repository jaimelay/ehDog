const express = require('express');

const Produto = require('./controllers/Produto');

const routes = express.Router();

routes.get('/produtos', Produto.getAllProducts);

module.exports = routes;