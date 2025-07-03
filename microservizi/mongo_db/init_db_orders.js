db = db.getSiblingDB('orders');

db.createCollection('externalOrders');

db.externalOrders.insertMany(
[
  {
    "orderID": 3001,
    "orderState": "In attesa",
    "creationDate": "2025-06-03T00:00:00Z",
    "timeToArrive": "2025-06-12T00:00:00Z",
    "warehouseDeparture": 1,
    "externalAddress": 555
  },
  {
    "orderID": 3002,
    "orderState": "In elaborazione",
    "creationDate": "2025-06-06T00:00:00Z",
    "timeToArrive": "2025-06-13T00:00:00Z",
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
    "warehouseDeparture": 1,
    "warehouseDestination": 2
  },
  {
    "orderID": 2002,
    "orderState": "In elaborazione",
    "creationDate": "2025-06-04T00:00:00Z",
    "timeToArrive": "2025-06-09T00:00:00Z",
    "warehouseDeparture": 2,
    "warehouseDestination": 3
  }
]);


db.createCollection('orderDetails');

db.orderDetails.insertMany([
  { orderID: 2001, idProduct: 10, nameProduct: "Mouse", quantity: 23, unitaryPrice: 16.99 },
  { orderID: 2001, idProduct: 11, nameProduct: "Penna", quantity: 53, unitaryPrice: 6.99 },
  { orderID: 2002, idProduct: 20, nameProduct: "Biscotti", quantity: 13, unitaryPrice: 6.50 },
  { orderID: 3001, idProduct: 10, nameProduct: "Mouse", quantity: 22, unitaryPrice: 14.99 },
  { orderID: 3001, idProduct: 11, nameProduct: "Penna", quantity: 52, unitaryPrice: 4.99 },
  { orderID: 3002, idProduct: 20, nameProduct: "Biscotti", quantity: 12, unitaryPrice: 4.50 }
]);