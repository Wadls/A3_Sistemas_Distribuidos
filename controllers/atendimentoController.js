const atendimentoModel = require('../models/atendimentoModels');
class AtendimentoController {
    buscar(id){
        return atendimentoModel.listar(id);
    }
    criar(novoAtendimento){
        return atendimentoModel.criar(novoAtendimento);
    }
    autalizar(atendimentoAtualizado,id){
        return atendimentoModel.atualizar(atendimentoAtualizado,id);    
    }
    deletar(id){
        return atendimentoModel.deletar(id);    
    }
}
module.exports = new AtendimentoController();