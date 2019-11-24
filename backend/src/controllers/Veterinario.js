const { execSQLQuery, execSQLQueryWhere } = require('../config/db');

module.exports = {
    getAllVeterinarios(req, res) {
        execSQLQuery('SELECT * FROM Veterinario', res);
    },

    deleteVeterinario(req, res){
        const { CRMV } = req.params;
        execSQLQueryWhere('DELETE FROM Veterinario WHERE CRMV = ?', [CRMV], res);
    },

    insertVeterinario(req, res){
        const { CRMV, CPF, nome_veterinario, end_veterinario, email_veterinario, tel_veterinario, salario_vet } = req.body;
        execSQLQuery(`INSERT INTO Veterinario(CRMV, CPF, nome_veterinario, end_veterinario, email_veterinario, tel_veterinario, salario_vet) VALUES (${CRMV}, ${CPF}, '${nome_veterinario}', '${end_veterinario}', '${email_veterinario}', ${tel_veterinario}, ${salario_vet})`, res);
    },

    getVeterinarioByCRMV(req, res){
        const { CRMV } = req.params;
        execSQLQueryWhere(`SELECT * FROM Veterinario WHERE CRMV = ?`, [CRMV], res);
    },

    getVeterinarioByCPF(req, res){
        const { CPF } = req.params;
        execSQLQueryWhere(`SELECT * FROM Veterinario WHERE CPF = ?`, [CPF], res);
    },

    updateVeterinario(req, res){
        const { oldCRMV, CRMV, CPF, nome_veterinario, end_veterinario, email_veterinario, tel_veterinario, salario_vet } = req.body;
        execSQLQuery(`UPDATE Veterinario SET CRMV = ${CRMV}, CPF = ${CPF}, nome_veterinario = '${nome_veterinario}', end_veterinario = '${end_veterinario}', email_veterinario = '${email_veterinario}', tel_veterinario = ${tel_veterinario}, salario_vet = ${salario_vet} WHERE CRMV = ${oldCRMV}`, res);
    }
}