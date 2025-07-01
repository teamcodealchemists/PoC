db = db.getSiblingDB('inv_aggregato_db');


db.createCollection("productTable");

// Inserimento diretto nella collezione `productTable`
db.productTable.insertMany([
    { 
        barCode: 10,
        name: "Mouse",
        unitPrice: 15.99
    },
    {       
        barCode: 20,
        name: "Penna",
        unitPrice: 0.99
    }
]);


db.createCollection("productInWareHouse");

// Inserimento diretto nella collezione `productInWareHouse`
db.productInWareHouse.insertMany([
    { 
        warehouseId: 1,
        barCode: 10,
        quantity: 50,
        minQuantity: 10,
        maxQuantity: 100
    },
    {       
        barCode: 20,
        warehouseId: 1,
        quantity: 200,
        minQuantity: 50,
        maxQuantity: 500
    }
])