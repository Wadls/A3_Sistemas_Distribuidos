CREATE DATABASE controle_atendimento;

CREATE TABLE IF NOT EXISTS atendimentos(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    DATA DATE,
    servico VARCHAR(100),
    STATUS ENUM("ativo","realizado", "cancelado") DEFAULT "ativo"
);