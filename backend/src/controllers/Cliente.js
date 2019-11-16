const { execSQLQuery } = require('../config/db');

module.exports = {
    getAllClients(req, res) {
        execSQLQuery('SELECT * FROM Cliente', res);
    }
}