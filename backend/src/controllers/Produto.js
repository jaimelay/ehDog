const { execSQLQuery, execSQLQueryWhere } = require('../config/db');

module.exports = {
    getAllProducts(req, res) {
        execSQLQuery('SELECT * FROM Produto', res);
    },

    getProduct(req, res){
        const { codProduto } = req.params;
        execSQLQueryWhere(`SELECT * FROM Produto WHERE cod_produto = ?`, [codProduto], res);
    },

    deleteProduct(req, res){
        const { codProduto } = req.params;
        execSQLQueryWhere('DELETE FROM Produto WHERE cod_produto = ?', [codProduto], res);
    },

    insertProduct(req, res){
        const { cod_produto, nome_produto, marca, valor_unitario, qtd_estoque } = req.body;
        execSQLQuery(`INSERT INTO Produto(cod_produto, nome_produto, marca, valor_unitario, qtd_estoque) VALUES (${cod_produto}, '${nome_produto}', '${marca}', ${valor_unitario}, ${qtd_estoque})`, res);
    },

    updateProduct(req, res){
        const { oldCodProduto, cod_produto, nome_produto, marca, valor_unitario, qtd_estoque } = req.body;
        execSQLQuery(`UPDATE Produto SET cod_produto = ${cod_produto}, nome_produto = '${nome_produto}', marca = '${marca}', valor_unitario = ${valor_unitario}, qtd_estoque = ${qtd_estoque} WHERE cod_produto = ${oldCodProduto}`, res);
    }
}