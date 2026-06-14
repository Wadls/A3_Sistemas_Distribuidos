const mysql = require('mysql');
const firstConn  = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password:"",
    multipleStatements: true
  
});
const conn  = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password:"",
    database:'drogaria'
  
});
module.exports = {firstConn,conn};