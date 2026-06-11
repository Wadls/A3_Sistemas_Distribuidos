class Tabelas  {
    
    init(conexao) {
        this.conexao = conexao;
        this.criarTabelaAtendimento();
        //this.inserirAtendimentos();
    }
    criarTabelaAtendimento(){
        const sql = `CREATE TABLE IF NOT EXISTS atendimentos(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        DATA DATE,
        servico VARCHAR(100),
        STATUS ENUM("ativo","realizado", "cancelado") DEFAULT "ativo"
        );`;
        this.conexao.query(sql, (error)=>{
            if (error) {
                console.log('Eita, deu erro na hora de criar a tabela');
                console.log(error.message);
                return;   
            }
            console.log('Tabela criada com sucesso')
        });
    }
    inserirAtendimentos(){
        const sql  = `INSERT INTO atendimentos (DATA, servico, STATUS) VALUES
            ('2026-06-11', 'Suporte Técnico Remoto', 'realizado'),
            ('2026-06-11', 'Manutenção de Computador', 'ativo'),
            ('2026-06-12', 'Consultoria de Banco de Dados', 'ativo'),
            ('2026-06-12', 'Instalação de Rede Local', 'cancelado'),
            ('2026-06-13', 'Configuração de Servidor VPS', 'ativo'),
            ('2026-06-13', 'Desenvolvimento de API Node.js', 'ativo'),
            ('2026-06-14', 'Treinamento de Sistema', 'realizado'),
            ('2026-06-14', 'Backup e Recuperação de Dados', 'ativo'),
            ('2026-06-15', 'Auditoria de Segurança', 'cancelado'),
            ('2026-06-15', 'Otimização de Queries SQL', 'ativo');`;
            
            this.conexao.query(sql, (error)=>{
                if (error) {
                console.log('Eita, deu erro na hora de inserir os dados da tabela');
                console.log(error.message);
                return;   
            }
            console.log('Inserido com sucesso')
        });
    
    
        }
    
};

module.exports = new Tabelas();