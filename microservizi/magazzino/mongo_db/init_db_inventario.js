db = db.getSiblingDB('inventory');

// Inserimento diretto nella collezione `inventory`
db.inventory.insertMany([
  {
    id: 10,
    name: "Mouse",
    unitPrice: 15.99,
    quantity: 50,
    minQuantity: 10,
    maxQuantity: 100
  },
  {
    id: 20,
    name: "Penna",
    unitPrice: 0.99,
    quantity: 200,
    minQuantity: 50,
    maxQuantity: 500
  },
  {
    id: 30,
    name: "Biscotti",
    unitPrice: 2.50,
    quantity: 80,
    minQuantity: 20,
    maxQuantity: 200
  },
  {
    id: 40,
    name: "Caramelle",
    unitPrice: 2.99,
    quantity: 80,
    minQuantity: 20,
    maxQuantity: 200
  }
]);
