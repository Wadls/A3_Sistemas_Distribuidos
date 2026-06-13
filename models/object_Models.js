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
        // Retorna o ID mapeado ou assume 'id' caso seja outra tabela
        return chaves[tabela.toLowerCase()] || 'id';
    }

    listar(tabela, id = null) {
        return new Promise((resolve, reject) => {
            // Injetamos o nome da tabela direto na string com crases
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
                    return resolve(resposta[0] || null);
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
                resolve(resposta);
            });
        });
    }
}

module.exports = new ObjModel();