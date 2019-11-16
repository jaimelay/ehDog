const express = require('express');

const Produto = require('./controllers/Produto');
const Cliente = require('./controllers/Cliente');

const routes = express.Router();

routes.get('/produtos', Produto.getAllProducts);


routes.get('/clientes', Cliente.getAllClients);

module.exports = routes;