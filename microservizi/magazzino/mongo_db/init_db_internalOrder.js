dbInternal = dbInternal.getSiblingDB('orderInternal');
dbInternal.insertMany(
[
  {
    "orderID": 2001,
    "orderState": "In attesa",
    "creationDate": "2025-06-02T00:00:00Z",
    "timeToArrive": "2025-06-08T00:00:00Z",
    "idProduct": 30,
    "quantity": 30,
    "warehouseDeparture": 1,
    "warehouseDestination": 2
  },
  {
    "orderID": 2002,
    "orderState": "In elaborazione",
    "creationDate": "2025-06-04T00:00:00Z",
    "timeToArrive": "2025-06-09T00:00:00Z",
    "idProduct": 40,
    "quantity": 60,
    "warehouseDeparture": 2,
    "warehouseDestination": 3
  }
])
