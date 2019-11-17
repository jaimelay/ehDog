const { execSQLQuery, execSQLQueryWhere } = require('../config/db');

module.exports = {
    getAllClients(req, res) {
        execSQLQuery('SELECT * FROM Cliente', res);
    },

    deleteClient(req, res){
        const { CPF } = req.params;
        execSQLQueryWhere('DELETE FROM Cliente WHERE CPF = ?', [CPF], res);
    }
}