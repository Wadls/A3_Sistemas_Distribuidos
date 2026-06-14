const conn = require('../infraestrutura/conexao');


class RelatorioModel {

    // 1. Relatório de Produtos Mais Vendidos
    produtosMaisVendidos() {
        const sql = `
            SELECT 
                e.id_produto,
                e.nome_produto,
                SUM(v.qtd) AS total_vendido
            FROM vendas v
            JOIN estoque e ON v.id_produto = e.id_produto
            WHERE v.status = 'Confirmado'
            GROUP BY e.id_produto
            ORDER BY total_vendido DESC;
        `;

        return new Promise((resolve, reject) => {
            conn.query(sql, (error, resposta) => {
                if (error) {
                    console.log("Deu erro no relatório de produtos mais vendidos...");
                    return reject(error);
                }
                resolve(resposta);
            });
        });
    }

    // 2. Relatório de Produtos por Cliente (O que cada cliente comprou)
    produtosPorCliente() {
        const sql = `
            SELECT 
                c.id_cliente,
                c.nome AS nome_cliente,
                e.nome_produto,
                SUM(v.qtd) AS quantidade_comprada
            FROM vendas v
            JOIN cliente c ON v.id_cliente = c.id_cliente
            JOIN estoque e ON v.id_produto = e.id_produto
            WHERE v.status = 'Confirmado'
            GROUP BY c.id_cliente, e.id_produto
            ORDER BY c.nome ASC, quantidade_comprada DESC;
        `;

        return new Promise((resolve, reject) => {
            conn.query(sql, (error, resposta) => {
                if (error) {
                    console.log("Deu erro no relatório de produtos por cliente...");
                    return reject(error);
                }
                resolve(resposta);
            });
        });
    }

    // 3. Relatório de Consumo Médio do Cliente (Média de itens por pedido feito)
    consumoMedioCliente() {
        const sql = `
            SELECT 
                c.id_cliente,
                c.nome AS nome_cliente,
                ROUND(AVG(v.qtd), 2) AS media_itens_por_pedido,
                SUM(v.qtd) AS total_itens_comprados
            FROM vendas v
            JOIN cliente c ON v.id_cliente = c.id_cliente
            WHERE v.status = 'Confirmado'
            GROUP BY c.id_cliente
            ORDER BY total_itens_comprados DESC;
        `;

        return new Promise((resolve, reject) => {
            conn.query(sql, (error, resposta) => {
                if (error) {
                    console.log("Deu erro no relatório de consumo médio...");
                    return reject(error);
                }
                resolve(resposta);
            });
        });
    }

    // 4. Relatório de Produtos com Baixo Estoque
    // Aceita um limite dinâmico. Se não for passado, assume 50 unidades como padrão.
    produtosBaixoEstoque(limiteQuantidade = 50) {
        const sql = `
            SELECT 
                id_produto,
                nome_produto,
                quantidade AS quantidade_atual
            FROM estoque
            WHERE quantidade <= ?
            ORDER BY quantidade ASC;
        `;

        return new Promise((resolve, reject) => {
            conn.query(sql, [limiteQuantidade], (error, resposta) => {
                if (error) {
                    console.log("Deu erro no relatório de baixo estoque...");
                    return reject(error);
                }
                resolve(resposta);
            });
        });
    }
}

module.exports = new RelatorioModel();