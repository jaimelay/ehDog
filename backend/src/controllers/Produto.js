const { execSQLQuery } = require('../config/mysql');

module.exports = {
    getAllProducts(req, res) {
        execSQLQuery('SELECT * FROM Produto', res);
    }
}