const { execSQLQuery, execSQLQueryWhere } = require('../config/db');

module.exports = {
    getAllProducts(req, res) {
        execSQLQuery('SELECT * FROM Produto', res);
    },

    deleteProduct(req, res){
        const { codProduto } = req.params;
        execSQLQueryWhere('DELETE FROM Produto WHERE cod_produto = ?', [codProduto], res);
    }
}