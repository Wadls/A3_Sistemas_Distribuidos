const express = require('express');
const router = require('./routers/exporter');
const app = express();
const port = 3000;
const conn = require('./infraestrutura/conexao');
const tabelas = require('./infraestrutura/tabelas');

router(app,express);

 


//Início do programa + inserção de dados na tabela
tabelas.init(conn.firstConn);


app.listen(port),(error)=>{
    if (error) {
        console.log('Deu Erro');
        return;
    }
    console.log('Server is Running')

};
app.get('/',(req,res)=>{
    res.send("<h1>O bixo é bom mesmo né</h1>");
});

