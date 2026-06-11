const mysql = require('mysql');
const conn  = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password:"",
    database:'controle_atendimento'
});

module.exports = conn;