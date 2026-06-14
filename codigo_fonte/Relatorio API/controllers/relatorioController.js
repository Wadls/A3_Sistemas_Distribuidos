const RelatorioModel = require('../models/relatorioModel');

class RelatorioController {

    produtosMaisVendidos() {
        return RelatorioModel.produtosMaisVendidos();
    }

    produtosPorCliente() {
        return RelatorioModel.produtosPorCliente();
    }

    consumoMedioCliente() {
        return RelatorioModel.consumoMedioCliente();
    }

    // Repassa o limite recebido da rota (ou undefined para usar o padrão de 50)
    produtosBaixoEstoque(limiteQuantidade) {
        return RelatorioModel.produtosBaixoEstoque(limiteQuantidade);
    }
}

module.exports = new RelatorioController();