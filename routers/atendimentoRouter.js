const { Router } = require('express');
const router = Router();
const atendimentoController = require('../controllers/atendimentoController');
const atendimentoModels = require('../models/atendimentoModels');


router.get('/atendimentos', (req,res)=>{
    const listaAtendimentos = atendimentoController.buscar();
    listaAtendimentos.then(lista => res.status(200).json(lista))
});
router.get('/atendimentos/:id', (req,res)=>{
    const id = req.params.id ? parseInt(req.params.id) : null;
    const listaAtendimentos = atendimentoController.buscar(id);
    listaAtendimentos.then(lista => {
        //se ele tentar buscar um ID que não existe
        if (id && !lista) {
            return res.status(404).json({ mensagem: "Atendimento não encontrado." });
        }
        //se o id existe na lista de atendimentos 
        return res.status(200).json(lista)})
});


router.post('/atendimento', (req,res)=>{
    const novoAtendimentoInput = req.body;
    const novoAtendimento = atendimentoController.criar(novoAtendimentoInput);
    novoAtendimento.then(atendimentoCriado => res.status(201).json(atendimentoCriado)).catch(error =>res.status(400).json(error.message));
});


router.put('/atendimento/:id', (req,res)=>{
    const {id} = req.params;
    const resposta = atendimentoController.autalizar(id);
    res.send(resposta);
    
});


router.delete('/atendimento/:id', (req,res)=>{
    const {id} = req.params;
    const resposta = atendimentoController.deletar(id);
    res.send(resposta);
});


module.exports = router;