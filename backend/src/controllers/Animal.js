const { execSQLQuery, execSQLQueryWhere } = require('../config/db');

module.exports = {
    getAllAnimals(req, res) {
        execSQLQuery('SELECT * FROM Animal', res);
    },

    getAnimal(req, res){
        const { codAnimal } = req.params;
        execSQLQueryWhere(`SELECT * FROM Animal WHERE cod_animal = ?`, [codAnimal], res);
    },

    deleteAnimal(req, res){
        const { codAnimal } = req.params;
        execSQLQueryWhere('DELETE FROM Animal WHERE cod_animal = ?', [codAnimal], res);
    },

    insertAnimal(req, res){
        const { cod_animal, nome_animal, tipo, alergia, raca, porte, fk_Cliente_CPF } = req.body;
        execSQLQuery(`INSERT INTO Animal(cod_animal, nome_animal, tipo, alergia, raca, porte, fk_Cliente_CPF) VALUES (${cod_animal}, '${nome_animal}', '${tipo}', '${alergia}', '${raca}', '${porte}', ${fk_Cliente_CPF})`, res);
    },

    updateAnimal(req, res){
        const { oldCodAnimal, cod_animal, nome_animal, tipo, alergia, raca, porte, fk_Cliente_CPF } = req.body;
        execSQLQuery(`UPDATE Animal SET cod_animal = ${cod_animal}, nome_animal = '${nome_animal}', tipo = '${tipo}', alergia = '${alergia}', raca = '${raca}', porte = '${raca}', porte = '${porte}', fk_Cliente_CPF = ${fk_Cliente_CPF} WHERE cod_animal = ${oldCodAnimal}`, res);
    }
}