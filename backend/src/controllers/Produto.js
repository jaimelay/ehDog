const { execSQLQuery, connection } = require('../config/db');

module.exports = {
    getAllProducts(req, res) {
        execSQLQuery('SELECT * FROM Produto', res);
    }
}