db = db.getSiblingDB('inv_aggregato_db');


db.createCollection("productTable");

// Inserimento diretto nella collezione `productTable`
db.productTable.insertMany([
    { 
        barCode: 10,
        productName: "Mouse",
        unitaryPrice: 15.99
    },
    {       
        barCode: 20,
        productName: "Penna",
        unitaryPrice: 0.99
    }
]);


db.createCollection("productInWarehouse");

// Inserimento diretto nella collezione `productInWarehouse`
db.productInWarehouse.insertMany([
    { 
        warehouseId: 1,
        barCode: 10,
        quantity: 50,
        minQuantity: 10,
        maxQuantity: 100
    },
        { 
        warehouseId: 2,
        barCode: 10,
        quantity: 80,
        minQuantity:30,
        maxQuantity: 120
    },
    {       
        warehouseId: 1,
        barCode: 20,
        quantity: 200,
        minQuantity: 50,
        maxQuantity: 500
    }
])