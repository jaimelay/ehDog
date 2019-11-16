const Tables = require('./tables');
const { connection } = require('../config/db');

Tables.createTableCliente();
Tables.createTableAnimal();
Tables.createTableVeterinario();
Tables.createTableTosador();
Tables.createTableProduto();
Tables.createTableSolicita();
Tables.createTableCompra();
Tables.createTableServico();
Tables.createTableConsulta();
Tables.alterTableAnimal();
Tables.alterTableServico();
Tables.alterTableSolicita();
Tables.alterTableCompra();
Tables.alterTableConsulta();

connection.end();