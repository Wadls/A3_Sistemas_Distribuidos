const { Router } = require('express');
const router = Router();
const atendimentoController = require('../controllers/object_Controller');

// GET - Listar todos (Ex: /cliente ou /vendedor)
router.get('/:tabela', (req, res) => {
    const { tabela } = req.params; // O Express já extrai como String! Ex: "cliente"
    
    atendimentoController.buscar(tabela)
        .then(lista => res.status(200).json(lista))
        .catch(error => res.status(500).json({ erro: error.message }));
});

// GET - Buscar por ID (Ex: /cliente/2)
router.get('/:tabela/:id', (req, res) => {
    const { tabela } = req.params;
    const id = req.params.id ? parseInt(req.params.id) : null;
    
    atendimentoController.buscar(tabela, id)
        .then(lista => {
            if (id && !lista) {
                return res.status(404).json({ mensagem: "Registro não encontrado." });
            }
            return res.status(200).json(lista);
        })
        .catch(error => res.status(500).json({ erro: error.message }));
});

// POST - Criar registro (Ex: /cliente)
router.post('/:tabela', (req, res) => {
    const { tabela } = req.params;
    const novoObjetoInput = req.body;

    if (tabela.toLowerCase() === 'vendas') {
        return res.status(400).json({ 
            erro: "Operação não permitida. Para cancelar um pedido, use a rota específica: POST /vendas/:id/cancelar" 
        });
    }
    
    atendimentoController.criar(tabela, novoObjetoInput)
        .then(criado => res.status(201).json(criado))
        .catch(error => res.status(400).json({ erro: error.message }));
});

// PUT - Atualizar por ID (Ex: /vendedor/1)
router.put('/:tabela/:id', (req, res) => {
    const { tabela, id } = req.params;
    const atendimentoAtualizado = req.body;

    // 🛑 BLOQUEIO DE SEGURANÇA: Impede PUT direto em vendas
    if (tabela.toLowerCase() === 'vendas') {
        return res.status(400).json({ 
            erro: "Operação não permitida. Para criar um pedido, use a rota específica: POST /vendas/pedido" 
        });
    }
    
    atendimentoController.atualizar(tabela, atendimentoAtualizado, id)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ erro: error.message }));
});

// DELETE - Deletar por ID (Ex: /estoque/5)
router.delete('/:tabela/:id', (req, res) => {
    const { tabela, id } = req.params;
    
    atendimentoController.deletar(tabela, id)
        .then(resultado => {
            if (resultado && resultado.affectedRows === 0) {
                return res.status(404).json({ mensagem: "Registro não encontrado." });
            }
            return res.status(200).json({ mensagem: "Deletado com sucesso!", id });
        })
        .catch(erro => res.status(500).json({ mensagem: "Erro ao deletar", erro: erro.message })); 
});

// Fazer um pedido de venda, vai funcionar por meio do método (POST)
router.post('/vendas/pedido', (req, res) => {
    const dadosPedido = req.body; // Recebe id_cliente, id_produto, qtd, id_vendedor
    
    atendimentoController.criarPedidoVenda(dadosPedido)
        .then(resultado => res.status(201).json(resultado))
        .catch(error => res.status(400).json({ erro: error.message }));
});

// Cancelar um pedido de venda, a venda permanece registrada no histórico (PUT)
router.put('/vendas/:id/cancelar', (req, res) => {
    const id = parseInt(req.params.id);
    
    atendimentoController.cancelarPedidoVenda(id)
        .then(resultado => res.status(200).json(resultado))
        .catch(error => res.status(400).json({ erro: error.message }));
});

module.exports = router;