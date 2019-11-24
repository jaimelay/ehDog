const { execSQLQuery, execSQLQueryWhere } = require('../config/db');

module.exports = {
    getAllTosadores(req, res) {
        execSQLQuery('SELECT * FROM Tosador', res);
    },

    deleteTosador(req, res){
        const { CPF } = req.params;
        execSQLQueryWhere('DELETE FROM Tosador WHERE CPF = ?', [CPF], res);
    },

    insertTosador(req, res){
        const { CPF, nome_tosador, end_tosador, email_tosador, tel_tosador, salario_tos } = req.body;
        execSQLQuery(`INSERT INTO Tosador(CPF, nome_tosador, end_tosador, email_tosador, tel_tosador, salario_tos) VALUES (${CPF}, '${nome_tosador}', '${end_tosador}', '${email_tosador}', ${tel_tosador}, ${salario_tos})`, res);
    },

    getTosador(req, res){
        const { CPF } = req.params;
        execSQLQueryWhere(`SELECT * FROM Tosador WHERE CPF = ?`, [CPF], res);
    },

    updateTosador(req, res){
        const { oldCPF, CPF, nome_tosador, end_tosador, email_tosador, tel_tosador, salario_tos } = req.body;
        execSQLQuery(`UPDATE Tosador SET CPF = ${CPF}, nome_tosador = '${nome_tosador}', end_tosador = '${end_tosador}', email_tosador = '${email_tosador}', tel_tosador = ${tel_tosador}, salario_tos = ${salario_tos} WHERE CPF = ${oldCPF}`, res);
    }
}