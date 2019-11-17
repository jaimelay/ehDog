const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'ehdog',
    password : 'ehdog1234',
    database : 'ehdog'
});

connection.connect(function(err) {
    if (err) throw err;
});

function execSQLQuery(sqlQuery, res){
    connection.query(sqlQuery, function(error, results, fields){
        if (error) {
            res.json(error);
        } else {
            res.json(results);
        }
        console.log('executou!');
    });
}

function execSQLQueryWhere(sqlQuery, params, res){
    connection.query(sqlQuery, params, function(error, results, fields){
        if (error) {
            res.json(error);
        } else {
            res.send('Deletado com sucesso.');
        }
    });
}

function execSQLQuery2(sqlQuery){
    connection.query(sqlQuery, function(error, results, fields){
        if (error) {
            return console.log(error);
        }
        console.log('executou!');
    });
}

module.exports = { connection, execSQLQuery, execSQLQueryWhere, execSQLQuery2 };