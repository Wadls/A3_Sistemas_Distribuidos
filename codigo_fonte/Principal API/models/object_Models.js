const conexao = require('../infraestrutura/conexao');
const conn = conexao.conn;

class ObjModel {
    
    // Método auxiliar para descobrir o nome da chave primária de cada tabela
    _obterChavePrimaria(tabela) {
        const chaves = {
            cliente: 'id_cliente',
            vendedor: 'id_vendedor',
            estoque: 'id_produto',
            vendas: 'id_venda',
        };
        return chaves[tabela.toLowerCase()] || 'id';
    }

    // NOVO: Método auxiliar para formatar o nome do erro amigável
    _obterNomeSingular(tabela) {
        const nomes = {
            cliente: 'Cliente',
            vendedor: 'Vendedor',
            estoque: 'Produto',
            vendas: 'Venda'
        };
        return nomes[tabela.toLowerCase()] || 'Registro';
    }

    listar(tabela, id = null) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM ${tabela}`;
            const params = [];

            if (id) {
                const pk = this._obterChavePrimaria(tabela);
                sql += ` WHERE ${pk} = ?`;
                params.push(id); 
            }

            conn.query(sql, params, (error, resposta) => {
                if (error) {
                    console.log(`Deu erro no listar da tabela ${tabela}...`);
                    return reject(error);
                }
                
                if (id) {
                    // Se buscou por ID e a lista veio vazia, o registro não existe
                    if (resposta.length === 0) {
                        const nomeEntidade = this._obterNomeSingular(tabela);
                        return reject(new Error(`${nomeEntidade} não encontrado(a).`));
                    }
                    return resolve(resposta[0]);
                }
                
                return resolve(resposta);
            });
        });
    }

    criar(tabela, novoObjeto) {
        const sql = `INSERT INTO ${tabela} SET ?`;
        
        return new Promise((resolve, reject) => {
            conn.query(sql, novoObjeto, (error, resposta) => {
                if (error) {
                    console.log(`Deu erro na criação de um registro em ${tabela}...`);
                    return reject(error);
                }
                resolve(resposta);
            });
        });
    }

    atualizar(tabela, objetoAtualizado, id) {
        const pk = this._obterChavePrimaria(tabela);
        const sql = `UPDATE ${tabela} SET ? WHERE ${pk} = ?`;
        
        return new Promise((resolve, reject) => {
            conn.query(sql, [objetoAtualizado, id], (error, resposta) => {
                if (error) {
                    console.log(`Deu erro na atualização da tabela ${tabela}...`);
                    return reject(error);
                }

                // Se affectedRows for 0, o ID passado não existia no banco
                if (resposta.affectedRows === 0) {
                    const nomeEntidade = this._obterNomeSingular(tabela);
                    return reject(new Error(`${nomeEntidade} não encontrado(a) para atualização.`));
                }

                resolve(resposta);
            });
        });
    }

    deletar(tabela, id) {
        const pk = this._obterChavePrimaria(tabela);
        const sql = `DELETE FROM ${tabela} WHERE ${pk} = ?`;
        
        return new Promise((resolve, reject) => {
            conn.query(sql, id, (error, resposta) => {
                if (error) {
                    console.log(`Deu erro na hora de apagar na tabela ${tabela}...`);
                    return reject(error);
                }

                // Se affectedRows for 0, o ID passado não existia no banco
                if (resposta.affectedRows === 0) {
                    const nomeEntidade = this._obterNomeSingular(tabela);
                    return reject(new Error(`${nomeEntidade} não encontrado(a) para exclusão.`));
                }

                resolve(resposta);
            });
        });
    }
    // A partir, teremos as funções de pedido de venda, e cancelamento
    criarPedidoVenda(dadosPedido) {
        const { id_cliente, id_produto, qtd, id_vendedor } = dadosPedido;

        return new Promise((resolve, reject) => {
            // Inicia uma Transação no Banco
            conn.beginTransaction((err) => {
                if (err) return reject(err);

                // 1. Verifica se o produto existe e busca a quantidade atual travando a linha (FOR UPDATE)
                conn.query("SELECT quantidade FROM estoque WHERE id_produto = ? FOR UPDATE", [id_produto], (err, resEstoque) => {
                    if (err) return conn.rollback(() => reject(err));
                    
                    if (resEstoque.length === 0) {
                        return conn.rollback(() => reject(new Error("Produto solicitado não existe no estoque.")));
                    }

                    const qtdAtual = resEstoque[0].quantidade;

                    // 2. Valida se há produtos suficientes
                    if (qtdAtual < qtd) {
                        return conn.rollback(() => reject(new Error(`Estoque insuficiente. Quantidade disponível: ${qtdAtual}`)));
                    }

                    // 3. Deduz a quantidade do estoque
                    conn.query("UPDATE estoque SET quantidade = quantidade - ? WHERE id_produto = ?", [qtd, id_produto], (err) => {
                        if (err) return conn.rollback(() => reject(err));

                        // 4. Cria a venda com o status 'Aberto' (Pedido Recebido)
                        const novaVenda = { id_cliente, id_produto, qtd, status: 'Confirmado', id_vendedor };
                        conn.query("INSERT INTO vendas SET ?", novaVenda, (err, resVenda) => {
                            if (err) return conn.rollback(() => reject(err));

                            // Se tudo deu certo, consolida as alterações no banco
                            conn.commit((err) => {
                                if (err) return conn.rollback(() => reject(err));
                                resolve({ 
                                    mensagem: "Pedido de compra recebido com sucesso!", 
                                    id_venda: resVenda.insertId 
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    cancelarPedidoVenda(idVenda) {
        return new Promise((resolve, reject) => {
            conn.beginTransaction((err) => {
                if (err) return reject(err);

                // 1. Busca os detalhes da venda para saber o produto e a quantidade que foi comprada
                conn.query("SELECT id_produto, qtd, status FROM vendas WHERE id_venda = ? FOR UPDATE", [idVenda], (err, resVenda) => {
                    if (err) return conn.rollback(() => reject(err));

                    if (resVenda.length === 0) {
                        return conn.rollback(() => reject(new Error("Venda não encontrada.")));
                    }

                    const { id_produto, qtd, status } = resVenda[0];

                    if (status === 'Cancelada') {
                        return conn.rollback(() => reject(new Error("Este pedido já está cancelado.")));
                    }

                    // 2. Devolve a quantidade de volta para o estoque
                    conn.query("UPDATE estoque SET quantidade = quantidade + ? WHERE id_produto = ?", [qtd, id_produto], (err) => {
                        if (err) return conn.rollback(() => reject(err));

                        // 3. Altera o status da venda para 'Cancelada'
                        conn.query("UPDATE vendas SET status = 'Cancelada' WHERE id_venda = ?", [idVenda], (err) => {
                            if (err) return conn.rollback(() => reject(err));

                            conn.commit((err) => {
                                if (err) return conn.rollback(() => reject(err));
                                resolve({ mensagem: "Pedido cancelado com sucesso e produtos devolvidos ao estoque!" });
                            });
                        });
                    });
                });
            });
        });
    }
}

module.exports = new ObjModel();