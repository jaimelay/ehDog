const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const mysql = require('mysql');

const server = express();
const PORT = process.env.PORT || 3333;

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'ehdog',
    password : 'ehdog1234',
    database : 'ehdog'
});

connection.connect();

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}.`);
});