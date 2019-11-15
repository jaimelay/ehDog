const Values = require('./values');
const { connection } = require('../config/mysql');

Values.insertCliente();
Values.insertVet();
Values.insertTosador();
Values.insertAnimal();
Values.insertProduto();
Values.insertSolicita();
Values.insertCompra();
Values.insertServico();
Values.insertConsulta();

connection.end();