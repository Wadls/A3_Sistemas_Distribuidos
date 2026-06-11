const atendimentoModel = require('../models/atendimentoModels');
class AtendimentoController {
    buscar(id){
        return atendimentoModel.listar(id);
    }
    criar(novoAtendimento){
        return atendimentoModel.criar(novoAtendimento);
    }
    autalizar(id){
        return "Alterando atendimento número " + id + "...";
    }
    deletar(id){
        return "Deletando atendimento número " + id + "...";
    }
}
module.exports = new AtendimentoController();