db = db.getSiblingDB('orders');

db.createCollection('externalOrders');

db.externalOrders.insertMany(
[
  {
    "orderID": 3001,
    "orderState": "In attesa",
    "creationDate": "2025-06-03T00:00:00Z",
    "timeToArrive": "2025-06-12T00:00:00Z",
    "products": [
      { "idProduct": 10, "quantity": 25 },
      { "idProduct": 11, "quantity": 5 }
    ],
    "warehouseDeparture": 1,
    "externalAddress": 555
  },
  {
    "orderID": 3002,
    "orderState": "In elaborazione",
    "creationDate": "2025-06-06T00:00:00Z",
    "timeToArrive": "2025-06-13T00:00:00Z",
    "products": [
      { "idProduct": 20, "quantity": 100 }
    ],
    "warehouseDeparture": 2,
    "externalAddress": 666
  }
]);


db.createCollection('internalOrders');

db.internalOrders.insertMany(
[
  {
    "orderID": 2001,
    "orderState": "In attesa",
    "creationDate": "2025-06-02T00:00:00Z",
    "timeToArrive": "2025-06-08T00:00:00Z",
    "products": [
      { "idProduct": 30, "quantity": 30 }
    ],
    "warehouseDeparture": 1,
    "warehouseDestination": 2
  },
  {
    "orderID": 2002,
    "orderState": "In elaborazione",
    "creationDate": "2025-06-04T00:00:00Z",
    "timeToArrive": "2025-06-09T00:00:00Z",
    "products": [
      { "idProduct": 40, "quantity": 60 },
      { "idProduct": 41, "quantity": 10 }
    ],
    "warehouseDeparture": 2,
    "warehouseDestination": 3
  }
]);