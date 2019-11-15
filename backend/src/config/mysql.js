const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'ehdog',
    password : 'ehdog1234',
    database : 'ehdog'
});

function execSQLQuery(sqlQuery, res){
    connection.query(sqlQuery, function(error, results, fields){
        if (error) {
            res.json(error);
        } else {
            res.json(results);
        }
        connection.end();
        console.log('executou!');
    });
}

module.exports = { connection, execSQLQuery };