# PoC: Sistema di Gestione di un Magazzino Distribuito

## Descrizione

Proof of Concept (PoC) per dei microservizi in [NestJS](https://nestjs.com/) containerizzati e orchestrati tramite Docker Compose.

## Prerequisiti
- [Node.js (>= 22.16.0)](https://nodejs.org/)
- [npm (>= 9.x)](https://www.npmjs.com/)
- [Docker (>= 24.x.x)](https://www.docker.com/get-started)
- [Docker Compose (>= 2.37.x)](https://docs.docker.com/compose/)
- 2+ CPU cores and 4GB+ RAM
- Almeno 20GB di spazio libero

## Avvio rapido

```bash
docker-compose up -d --build
```

L'api gateway sarà disponibile a `http://localhost:8080`.

Usare Postman per le richieste **REST**.
Di seguito il link per accedere ai comandi POSTMAN già pronti per dimostrazione.

[![Apri in Postman](https://img.shields.io/badge/Postman-Open%20Collection-orange?logo=postman)](https://codealchemists.postman.co/workspace/PoC_CodeAlchemists~10c9175a-d937-4806-9c14-8c5f03f69cbd/collection/46314414-83b8ab06-bfd8-41d9-9d0e-7bc71eaf02e8?action=share&creator=46314414)

## Struttura del progetto

```
.
├── microservizi/
├── api_gateway/
│   ├── src/
│   └── Dockerfile
├── cloud/
│   ├── inventario_aggregato/
│   │   ├── src/
│   │   └── Dockerfile
│   └── ../
├── magazzino/
│   ├── inventario/
│   │   ├── src/
│   │   └── Dockerfile
│   └── ordini/
│       ├── src/
│       └── Dockerfile
├── mongo_db/
│   ├── init_db_inventario.js
│   └── init_db_ordini.js
├── docker-compose.yaml
└── README.md
```

## Comandi utili

- Avviare i container (Costruire sempre prima):  
    `docker-compose up`
- Fermare i container:  
    `docker-compose down`
- Ricostruire i container:  
    `docker-compose up -d --build`

## Note

- Modifica le variabili d'ambiente nel file `docker-compose.yaml` se necessario.

## Riferimenti

- [NestJS Docs](https://docs.nestjs.com/)
- [Docker Compose Docs](https://docs.docker.com/compose/)
- [Postman](https://www.postman.com/)
