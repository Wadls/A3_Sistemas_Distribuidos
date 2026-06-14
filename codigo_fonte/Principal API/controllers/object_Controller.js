const ObjModel = require('../models/object_Models'); 

//A melhor maneira de otimizar o código e não criar 1 controller pra cada objeto, é pegar o meu controller antigo e torna-lo genérico, e assim, além das funções que ele tinha antes, agora o sistema absorve a tabela para fazer as requisições

class AtendimentoController {
    
    buscar(tabela, id = null) {
        return ObjModel.listar(tabela, id);
    }

    criar(tabela, novoObjeto) {
        return ObjModel.criar(tabela, novoObjeto);
    }

    atualizar(tabela, objetoAtualizado, id) {
        return ObjModel.atualizar(tabela, objetoAtualizado, id);
    }

    deletar(tabela, id) {
        return ObjModel.deletar(tabela, id);
    }
    criarPedidoVenda(dadosPedido) {
        return ObjModel.criarPedidoVenda(dadosPedido);
    }

    cancelarPedidoVenda(idVenda) {
        return ObjModel.cancelarPedidoVenda(idVenda);
    }
}

module.exports = new AtendimentoController();