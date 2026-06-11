const conn = require('../infraestrutura/conexao');

class AtendimentoModel {
    listar(id = null) {
        return new Promise((resolve, reject) => {

            // 1. Começamos com a query padrão (que traz tudo)
            let sql = "SELECT * FROM atendimentos";
            const params = [];

            // Mudança na Query caso ID existir (não for null), nós mudamos a query
            if (id) {
                sql += " WHERE id = ?";
                params.push(id); // Adiciona o ID no array de parâmetros seguros
            }

            // 3. Passamos as variáveis dinâmicas para o conn.query
            conn.query(sql, params, (error, resposta) => {
                if (error) {
                    console.log("Deu erro no listar...");
                    return reject(error);
                }
                
                console.log("Showww man");

                // 4. Se foi uma busca por ID, devolvemos apenas o objeto [0]
                // Se foi uma busca geral, devolvemos a lista inteira (resposta)
                if (id) {
                    return resolve(resposta[0] || null);
                }
                
                return resolve(resposta);
            });
        });
    }
    criar(novoAtendimento){
        const sql = "INSERT INTO atendimentos SET ?";
        
        return new Promise((resolve, reject) => {
            conn.query(sql, novoAtendimento, (error, resposta) => {
                if (error) {
                    console.log("Deu erro na criação de um novo atendimento...");
                    reject(error);
                }
                resolve(resposta);
            });
        });
    }
}

module.exports = new AtendimentoModel();