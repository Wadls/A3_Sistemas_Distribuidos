const mysql = require('mysql');

// Conexão de leitura direta na base da Drogaria.
// Lê de variáveis de ambiente (Docker), com fallback para o ambiente local.
const conn = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'drogaria'
});

module.exports = conn;
