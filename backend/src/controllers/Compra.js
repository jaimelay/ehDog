const { execSQLQuery, execSQLQueryWhere } = require('../config/db');

module.exports = {
    getAllCompras(req, res) {
        execSQLQuery('SELECT * FROM Compra', res);
    },

    deleteCompra(req, res){
        const { codCompra } = req.params;
        execSQLQueryWhere('DELETE FROM Compra WHERE cod_compra = ?', [codCompra], res);
    },

    insertCompra(req, res){
        const { cod_compra, data_hora_compra, fk_Produto_cod_produto, fk_Cliente_CPF } = req.body;
        execSQLQuery(`INSERT INTO Compra(cod_compra, data_hora_compra, fk_Produto_cod_produto, fk_Cliente_CPF) VALUES (${cod_compra}, ${data_hora_compra}, ${fk_Produto_cod_produto}, ${fk_Cliente_CPF})`, res);
    },

    getCompra(req, res){
        const { codCompra } = req.params;
        execSQLQueryWhere(`SELECT * FROM Compra WHERE cod_compra = ?`, [codCompra], res);
    },

    updateCompra(req, res){
        const { oldCodCompra, cod_compra, data_hora_compra, fk_Produto_cod_produto, fk_Cliente_CPF } = req.body;
        execSQLQuery(`UPDATE Compra SET cod_compra = ${cod_compra}, data_hora_compra = ${data_hora_compra}, fk_Produto_cod_produto = ${fk_Produto_cod_produto}, fk_Cliente_CPF = ${fk_Cliente_CPF} WHERE cod_compra = ${oldCodCompra}`, res);
    }
}