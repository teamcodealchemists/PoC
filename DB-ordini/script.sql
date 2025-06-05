CREATE DATABASE IF NOT EXISTS DB_ordini;
USE DB_ordini;

CREATE TABLE IF NOT EXISTS ordini (
    id_ordine INT AUTO_INCREMENT PRIMARY KEY,
    data_creazione DATETIME DEFAULT CURRENT_TIMESTAMP,
    magazzino_partenza VARCHAR(100),
    magazzino_destinazione VARCHAR(100),
    indirizzo_esterno VARCHAR(255),
    stato_ordine VARCHAR(50),
    time_to_arrive TIME
);


CREATE TABLE IF NOT EXISTS dettagli_ordine (
    id_ordine INT,
    codice_barre VARCHAR(50),
    quantita INT,
    prezzo_unitario DECIMAL(10,2),
    PRIMARY KEY (id_ordine, codice_barre),
    FOREIGN KEY (id_ordine) REFERENCES ordini(id_ordine) ON DELETE CASCADE,
   // FOREIGN KEY (codice_barre) REFERENCES inventario(codice_barre) ON DELETE CASCADE
);
