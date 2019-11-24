const { execSQLQuery, execSQLQueryWhere } = require('../config/db');

module.exports = {
    getAllClients(req, res) {
        execSQLQuery('SELECT * FROM Cliente', res);
    },

    deleteClient(req, res){
        const { CPF } = req.params;
        execSQLQueryWhere('DELETE FROM Cliente WHERE CPF = ?', [CPF], res);
    },
    insertClient(req, res){
        const { CPF, nome_cliente, end_cliente, email_cliente, tel_cliente } = req.body;
        execSQLQuery(`INSERT INTO cliente(CPF, nome_cliente, end_cliente, email_cliente, tel_cliente) VALUES (${CPF}, '${nome_cliente}', '${end_cliente}', ${email_cliente}, ${tel_cliente})`, res);
        console.log(res);
    },

    getClient(req, res){
        const { CPF } = req.params;
        execSQLQueryWhere(`SELECT * FROM Cliente WHERE CPF = ?`, [CPF], res);
    },

    updateClient(req, res){
        const {  CPF, nome_cliente, end_cliente, email_cliente, tel_cliente } = req.body;
        execSQLQuery(`UPDATE Cliente SET CPF = ${CPF}, nome_cliente = '${nome_cliente}', end_cliente = '${end_cliente}', email_cliente = ${email_cliente}, tel_cliente = ${tel_cliente} WHERE CPF = ${CPF}`, res);
    }
}