const express = require('express');

const Produto = require('./controllers/Produto');
const Cliente = require('./controllers/Cliente');
const Tosador = require('./controllers/Tosador');

const routes = express.Router();

routes.get('/produtos', Produto.getAllProducts);
routes.post('/produtos', Produto.insertProduct);
routes.delete('/produtos/:codProduto', Produto.deleteProduct);

routes.get('/clientes', Cliente.getAllClients);
routes.delete('/clientes/:CPF', Cliente.deleteClient);

routes.get('/tosador', Tosador.getAllTosador);
routes.delete('/tosador/:CPF', Tosador.deleteTosador);

module.exports = routes;