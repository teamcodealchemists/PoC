CREATE DATABASE IF NOT EXISTS DB_inventario;
USE DB_inventario;

CREATE TABLE IF NOT EXISTS categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nome_categoria VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS inventario (
    codice_barre VARCHAR(50) PRIMARY KEY,
    nome_prodotto VARCHAR(100) NOT NULL,
    prezzo_unitario DECIMAL(10,2) NOT NULL,
    quantita INT NOT NULL,
    quantita_minima INT NOT NULL,
    quantita_massima INT,
    id_categoria INT,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
);
