const express = require('express');

const Produto = require('./controllers/Produto');
const Cliente = require('./controllers/Cliente');
const Animal = require('./controllers/Animal');
const Tosador = require('./controllers/Tosador');
const Veterinario = require('./controllers/Veterinario');

const routes = express.Router();

routes.get('/produtos', Produto.getAllProducts);
routes.get('/produtos/:codProduto', Produto.getProduct);
routes.post('/produtos', Produto.insertProduct);
routes.put('/produtos', Produto.updateProduct);
routes.delete('/produtos/:codProduto', Produto.deleteProduct);

routes.get('/clientes', Cliente.getAllClients);
routes.get('/clientes/:CPF', Cliente.getClient);
routes.post('/clientes', Cliente.insertClient);
routes.put('/clientes', Cliente.updateClient);
routes.delete('/clientes/:CPF', Cliente.deleteClient);

routes.get('/animais', Animal.getAllAnimals);
routes.get('/animais/:codAnimal', Animal.getAnimal);
routes.post('/animais', Animal.insertAnimal);
routes.put('/animais', Animal.updateAnimal);
routes.delete('/animais/:codAnimal', Animal.deleteAnimal);

routes.get('/tosadores', Tosador.getAllTosadores);
routes.get('/tosadores/:CPF', Tosador.getTosador);
routes.post('/tosadores', Tosador.insertTosador);
routes.put('/tosadores', Tosador.updateTosador);
routes.delete('/tosadores/:CPF', Tosador.deleteTosador);

routes.get('/veterinarios', Veterinario.getAllVeterinarios);
routes.get('/veterinarios/:CRMV', Veterinario.getVeterinarioByCRMV);
routes.get('/veterinario/:CPF', Veterinario.getVeterinarioByCPF);
routes.post('/veterinarios', Veterinario.insertVeterinario);
routes.put('/veterinarios', Veterinario.updateVeterinario);
routes.delete('/veterinarios/:CRMV', Veterinario.deleteVeterinario);

module.exports = routes;