dbExternal = dbExternal.getSiblingDB('orderExternal');
dbExternal.insertMany(
[
  {
    "orderID": 3001,
    "orderState": "In attesa",
    "creationDate": "2025-06-03T00:00:00Z",
    "timeToArrive": "2025-06-12T00:00:00Z",
    "idProduct": 10,
    "quantity": 25,
    "warehouseDeparture": 1,
    "externalAddress": 555
  },
  {
    "orderID": 3002,
    "orderState": "In elaborazione",
    "creationDate": "2025-06-06T00:00:00Z",
    "timeToArrive": "2025-06-13T00:00:00Z",
    "idProduct": 20,
    "quantity": 100,
    "warehouseDeparture": 2,
    "externalAddress": 666
  }
])
