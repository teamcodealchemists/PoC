
db = db.getSiblingDB('inventario');

db.categorie.insertMany([
  { _id: 1, nome_categoria: "Elettronica" },
  { _id: 2, nome_categoria: "Cancelleria" },
  { _id: 3, nome_categoria: "Alimentari" },
]);


db.prodotti.insertMany([
  { codice_barre: "10", nome_prodotto: "Mouse", prezzo_unitario: 15.99 },
  { codice_barre: "20", nome_prodotto: "Penna", prezzo_unitario: 0.99 },
  { codice_barre: "30", nome_prodotto: "Biscotti", prezzo_unitario: 2.50 },
  { codice_barre: "31", nome_prodotto: "Caramelle", prezzo_unitario: 2.99 }
]);


db.inventario.insertMany([
  {
    codice_barre: "10",
    quantita: 50,
    quantita_minima: 10,
    quantita_massima: 100,
    id_categoria: 1
  },
  {
    codice_barre: "20",
    quantita: 200,
    quantita_minima: 50,
    quantita_massima: 500,
    id_categoria: 2
  },
  {
    codice_barre: "30",
    quantita: 80,
    quantita_minima: 20,
    quantita_massima: 200,
    id_categoria: 3
  },
    {
    codice_barre: "31",
    quantita: 80,
    quantita_minima: 20,
    quantita_massima: 200,
    id_categoria: 3
  }
]);
