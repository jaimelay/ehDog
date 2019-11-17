const { execSQLQuery, execSQLQueryWhere } = require('../config/db');

module.exports = {
    getAllTosador(req, res) {
        execSQLQuery('SELECT * FROM Tosador', res);
    },

    deleteTosador(req, res){
        const { CPF } = req.params;
        execSQLQueryWhere('DELETE FROM Tosador WHERE CPF = ?', [CPF], res);
    }
}