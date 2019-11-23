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
            res.send(results);
        }
    });
}

module.exports = { connection, execSQLQuery, execSQLQueryWhere };