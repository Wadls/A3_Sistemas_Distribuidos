const mysql = require('mysql'); // ou 'mysql2'

// Criamos a conexão apontando direto para a base de dados da Drogaria
const conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "",
    database: 'drogaria' // Conecta direto aqui para fazer as leituras
});


module.exports = conn;