const { execSQLQuery, execSQLQueryWhere } = require('../config/db');

module.exports = {
    getAllConsultas(req, res) {
        execSQLQuery('SELECT * FROM Consulta', res);
    },

    deleteConsulta(req, res){
        const { codConsulta } = req.params;
        execSQLQueryWhere('DELETE FROM Consulta WHERE cod_consulta = ?', [codConsulta], res);
    },

    insertConsulta(req, res){
        const { cod_consulta, data_hora_consulta, diagnostico, valor, fk_Veterinario_CRMV, fk_Animal_cod_animal } = req.body;
        execSQLQuery(`INSERT INTO Consulta(cod_consulta, data_hora_consulta, diagnostico, valor, fk_Veterinario_CRMV, fk_Animal_cod_animal) VALUES (${cod_consulta}, '${data_hora_consulta}', '${diagnostico}', ${valor}, ${fk_Veterinario_CRMV}, ${fk_Animal_cod_animal})`, res);
    },

    getConsulta(req, res){
        const { codConsulta } = req.params;
        execSQLQueryWhere(`SELECT * FROM Consulta WHERE cod_consulta = ?`, [codConsulta], res);
    },

    updateConsulta(req, res){
        const { oldCodConsulta, cod_consulta, data_hora_consulta, diagnostico, valor, fk_Veterinario_CRMV, fk_Animal_cod_animal } = req.body;
        execSQLQuery(`UPDATE Consulta SET cod_consulta = ${cod_consulta}, data_hora_consulta = '${data_hora_consulta}', diagnostico = '${diagnostico}', valor = ${valor}, fk_Veterinario_CRMV = ${fk_Veterinario_CRMV}, fk_Animal_cod_animal = ${fk_Animal_cod_animal} WHERE cod_consulta = ${oldCodConsulta}`, res);
    }
}