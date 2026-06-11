const conexao = require('./conexao'); // Seu primeiro arquivo (com as credenciais)
const tabelas = require('./tabelas'); // Este arquivo da imagem

// 1. Tenta conectar ao banco de dados
conexao.connect((erro) => {
  if (erro) {
    console.error('❌ Erro ao conectar ao banco de dados:', erro.message);
    return;
  }
  
  console.log('✅ Conexão com o banco realizada com sucesso!');
  
  // 2. Se conectou, inicializa a criação das tabelas
  tabelas.init(conexao);
});