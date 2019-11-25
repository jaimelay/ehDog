const { execSQLQuery, execSQLQueryWhere } = require('../config/db');

module.exports = {
    getAllServicos(req, res) {
        execSQLQuery('SELECT * FROM Servico', res);
    },

    deleteServico(req, res){
        const { codServico } = req.params;
        execSQLQueryWhere('DELETE FROM Servico WHERE cod_servico = ?', [codServico], res);
    },

    insertServico(req, res){
        const { cod_servico, preco_banho, preco_tosa, servico_TIPO, fk_Animal_cod_animal, fk_Tosador_CPF } = req.body;
        execSQLQuery(`INSERT INTO Servico(cod_servico, preco_banho, preco_tosa, servico_TIPO, fk_Animal_cod_animal, fk_Tosador_CPF) VALUES (${cod_servico}, ${preco_banho}, ${preco_tosa}, ${servico_TIPO}, ${fk_Animal_cod_animal}, ${fk_Tosador_CPF})`, res);
    },

    getServico(req, res){
        const { codServico } = req.params;
        execSQLQueryWhere(`SELECT * FROM Servico WHERE cod_servico = ?`, [codServico], res);
    },

    updateServico(req, res){
        const { oldCodServico, cod_servico, preco_banho, preco_tosa, servico_TIPO, fk_Animal_cod_animal, fk_Tosador_CPF } = req.body;
        execSQLQuery(`UPDATE Servico SET cod_servico = ${cod_servico}, preco_banho = ${preco_banho}, preco_tosa = ${preco_tosa}, servico_TIPO = ${servico_TIPO}, fk_Animal_cod_animal = ${fk_Animal_cod_animal}, fk_Tosador_CPF = ${fk_Tosador_CPF} WHERE cod_servico = ${oldCodServico}`, res);
    }
}