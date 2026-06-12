const fs = require('fs');
const path = require('path');

class Tabelas {
    
    init(conexao) {
        this.conexao = conexao;
        this.criarTabelaAtendimento();
    }

    criarTabelaAtendimento() {
        // Define o caminho absoluto para o arquivo SQL na mesma pasta
        const caminhoSql = path.join(__dirname, 'script_banco.sql');

        // Lendo o arquivo externo
        fs.readFile(caminhoSql, 'utf8', (err, sql) => {
            if (err) {
                console.log('Eita, deu erro na leitura do arquivo SQL externo!');
                console.log(err.message);
                return;
            }

            // Executa todo o conteúdo do arquivo de uma vez só
            this.conexao.query(sql, (error) => {
                if (error) {
                    console.log('Eita, deu erro na hora de executar o script do arquivo');
                    console.log(error.message);
                    return;   
                }
                console.log('Banco de dados, tabelas e dados iniciais criados com sucesso!');
            });
        });
    }
}

module.exports = new Tabelas();