const express = require('express');
const app = express();
const relatorioRouter = require('./routers/relatorioRouter');

// Porta diferente da API principal (que provavelmente roda na 3000)
const PORT = 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(relatorioRouter);

// Inicializa o servidor da API de Relatórios
app.listen(PORT, () => {
    console.log('API DE RELATÓRIOS TÁ RODANDO MN');
});