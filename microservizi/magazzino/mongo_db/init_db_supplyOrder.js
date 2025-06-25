dbSupply = dbSupply.getSiblingDB('orderSupply');
dbSupply.insertMany(
[
  {
    "orderID": 1001,
    "orderState": "In attesa",
    "creationDate": "2025-06-01T00:00:00Z",
    "timeToArrive": "2025-06-10T00:00:00Z",
    "idProduct": 10,
    "quantity": 50,
    "warehouseDestination": 1,
    "externalAddress": 999
  },
  {
    "orderID": 1002,
    "orderState": "In elaborazione",
    "creationDate": "2025-06-05T00:00:00Z",
    "timeToArrive": "2025-06-15T00:00:00Z",
    "idProduct": 20,
    "quantity": 150,
    "warehouseDestination": 2,
    "externalAddress": 888
  }
])