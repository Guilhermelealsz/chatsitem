create database chatsistem;
use chatsistem;


CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);


CREATE TABLE sala (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    usuario_id INT,  -- criador da sala
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

CREATE TABLE salaPermissao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sala_id INT,
    usuario_id INT,
    aprovado BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (sala_id) REFERENCES sala(id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);


CREATE TABLE chat (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    sala_id INT,
    mensagem TEXT NOT NULL,
    criacao DATETIME NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    FOREIGN KEY (sala_id) REFERENCES sala(id)
);


select * from usuario;

select * from sala;

select * from salaPermissao;

select * from chat;