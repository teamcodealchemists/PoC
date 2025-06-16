db = db.getSiblingDB('inventario');

// Inserimento diretto nella collezione `inventario`
db.inventario.insertMany([
  {
    codice_barre: "10",
    nome_prodotto: "Mouse",
    prezzo_unitario: 15.99,
    quantita: 50,
    quantita_minima: 10,
    quantita_massima: 100
  },
  {
    codice_barre: "20",
    nome_prodotto: "Penna",
    prezzo_unitario: 0.99,
    quantita: 200,
    quantita_minima: 50,
    quantita_massima: 500
  },
  {
    codice_barre: "30",
    nome_prodotto: "Biscotti",
    prezzo_unitario: 2.50,
    quantita: 80,
    quantita_minima: 20,
    quantita_massima: 200
  },
  {
    codice_barre: "40",
    nome_prodotto: "Caramelle",
    prezzo_unitario: 2.99,
    quantita: 80,
    quantita_minima: 20,
    quantita_massima: 200
  }
]);
