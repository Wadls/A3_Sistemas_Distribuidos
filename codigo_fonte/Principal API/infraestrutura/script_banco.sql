CREATE DATABASE IF NOT EXISTS drogaria;
USE drogaria;

CREATE TABLE IF NOT EXISTS cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS vendedor (
    id_vendedor INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    farmacia VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS estoque (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome_produto VARCHAR(150) NOT NULL UNIQUE,
    quantidade INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS vendas (
    id_venda INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_produto INT NOT NULL,
    qtd INT NOT NULL,
    status VARCHAR(15) NOT NULL CHECK (status IN ('Confirmado', 'Cancelada')),
    id_vendedor INT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_produto) REFERENCES estoque(id_produto),
    FOREIGN KEY (id_vendedor) REFERENCES vendedor(id_vendedor)
);


-- Inserindo 5 Clientes
INSERT IGNORE INTO cliente (id_cliente, nome, data_nascimento, email) VALUES
(1, 'João Silva', '1990-05-15', 'joao.silva@email.com'),
(2, 'Maria Santos', '1985-10-22', 'maria.santos@email.com'),
(3, 'Pedro Souza', '2000-02-10', 'pedro.souza@email.com'),
(4, 'Ana Oliveira', '1995-08-30', 'ana.oliveira@email.com'),
(5, 'Lucas Lima', '1988-12-05', 'lucas.lima@email.com');

-- Inserindo 2 Vendedores
INSERT IGNORE INTO vendedor (id_vendedor, nome, data_nascimento, email, farmacia) VALUES
(1, 'Carlos Rodrigues', '1980-04-20', 'carlos.vendedor@email.com', 'Filial Centro'),
(2, 'Mariana Costa', '1993-07-11', 'mariana.vendedor@email.com', 'Filial Zona Sul');

-- Inserindo 10 Produtos no Estoque
INSERT IGNORE INTO estoque (id_produto, nome_produto, quantidade) VALUES
(1, 'Paracetamol 750mg', 100),
(2, 'Ibuprofeno 600mg', 150),
(3, 'Dipirona Monoidratada 500mg', 200),
(4, 'Amoxicilina 500mg', 50),
(5, 'Omeprazol 20mg', 80),
(6, 'Losartana Potássica 50mg', 120),
(7, 'Cloridrato de Metformina 850mg', 110),
(8, 'Simvastatina 20mg', 90),
(9, 'Neosaldina Drágeas', 300),
(10, 'Dorflex Gotas 20ml', 250);

-- Inserindo 15 Vendas Iniciais (Misturando Pedidos Recebidos e Cancelados)
INSERT IGNORE INTO vendas (id_venda, id_cliente, id_produto, qtd, status, id_vendedor) VALUES
(1, 1, 1, 2, 'Confirmado', 1),     
(2, 2, 3, 1, 'Cancelada', 1),  
(3, 3, 2, 5, 'Confirmado', 2),     
(4, 4, 5, 1, 'Cancelada', 2),  
(5, 5, 9, 3, 'Confirmado', 1),     
(6, 1, 4, 2, 'Confirmado', 2),     
(7, 2, 7, 10, 'Cancelada', 1), 
(8, 3, 10, 4, 'Confirmado', 1),    
(9, 4, 1, 1, 'Cancelada', 2),  
(10, 5, 6, 2, 'Confirmado', 2),    
(11, 1, 8, 3, 'Cancelada', 1), 
(12, 2, 2, 1, 'Confirmado', 2),    
(13, 3, 5, 6, 'Confirmado', 1),    
(14, 4, 3, 2, 'Cancelada', 1), 
(15, 5, 4, 1, 'Confirmado', 2);