const { Router } = require('express');
const router = Router();
const relatorioController = require('../controllers/relatorioController');

// 1. Rota: Produtos Mais Vendidos
// GET http://localhost:3001/relatorios/produtos-mais-vendidos
router.get('/relatorios/produtos-mais-vendidos', (req, res) => {
    relatorioController.produtosMaisVendidos()
        .then(dados => res.status(200).json(dados))
        .catch(error => res.status(500).json({ erro: error.message }));
});

// 2. Rota: Produtos comprados por cada Cliente
// GET http://localhost:3001/relatorios/produtos-por-cliente
router.get('/relatorios/produtos-por-cliente', (req, res) => {
    relatorioController.produtosPorCliente()
        .then(dados => res.status(200).json(dados))
        .catch(error => res.status(500).json({ erro: error.message }));
});

// 3. Rota: Consumo Médio por Cliente
// GET http://localhost:3001/relatorios/consumo-medio
router.get('/relatorios/consumo-medio', (req, res) => {
    relatorioController.consumoMedioCliente()
        .then(dados => res.status(200).json(dados))
        .catch(error => res.status(500).json({ erro: error.message }));
});

// 4. Rota: Produtos com Baixo Estoque
// GET http://localhost:3001/relatorios/baixo-estoque
// Aceita opcionalmente um limite via URL, exemplo: /relatorios/baixo-estoque?limite=20
router.get('/relatorios/baixo-estoque', (req, res) => {
    const limite = req.query.limite ? parseInt(req.query.limite) : undefined;

    relatorioController.produtosBaixoEstoque(limite)
        .then(dados => res.status(200).json(dados))
        .catch(error => res.status(500).json({ erro: error.message }));
});

module.exports = router;