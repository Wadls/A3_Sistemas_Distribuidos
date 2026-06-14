const mysql = require('mysql');

// Configuração lida de variáveis de ambiente (Docker), com fallback para o ambiente local.
const DB_HOST     = process.env.DB_HOST || 'localhost';
const DB_PORT     = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;
const DB_USER     = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME     = process.env.DB_NAME || 'drogaria';

// firstConn: sem database e com multipleStatements, usada para rodar o script_banco.sql inteiro
const firstConn = mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    multipleStatements: true
});

// conn: já apontando para a base 'drogaria', usada nas operações do dia a dia
const conn = mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});

module.exports = { firstConn, conn };
