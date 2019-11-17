const express = require('express');

const Produto = require('./controllers/Produto');
const Cliente = require('./controllers/Cliente');

const routes = express.Router();

routes.get('/produtos', Produto.getAllProducts);
routes.delete('/produtos/:codProduto', Produto.deleteProduct);

routes.get('/clientes', Cliente.getAllClients);
routes.delete('/clientes/:CPF', Cliente.deleteClient);

module.exports = routes;