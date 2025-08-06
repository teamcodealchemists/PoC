import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InventoryMongo, InventorySchema } from 'src/infrastructure/schemas/inventory.schema';

/*
- Usa direttamente inventoryModel.create() e findOne() dal Model di Mongoose

- Nessun service, nessuna logica applicativa

- Test puro del livello dati (schema + MongoDB)
*/
const product = {
  id: 123,
  name: 'TestProdotto',
  unitPrice: 5,
  quantity: 10,
  minQuantity: 2,
  maxQuantity: 20,
};
  // Accesso diretto a MongoDB (isolato)
describe('MongoDB Raw Access', () => {
  // Istanza dell'app NestJS, necessaria per avviare il contesto e i moduli
  let app: INestApplication;

  // Model Mongoose che rappresenta la collezione dell'inventario su mongoDB
  let inventoryModel: Model<InventoryMongo>;

  beforeAll(async () => {
    // Crea un modulo di test NestJS con connessione a MongoDB reale
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        // Connessione a Mongo
        MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://localhost:27017/inventory'),

        // Registra lo schema InventoryMongo all'interno del modulo
        MongooseModule.forFeature([
          { name: InventoryMongo.name, schema: InventorySchema },
        ]),
      ],
    }).compile();

    // Crea un'applicazione NestJS dal modulo
    app = moduleFixture.createNestApplication();

    // Inizializza l'app Nest (necessario per completare la DI e setup)
    await app.init();

    // Ottiene il model Mongoose per accedere direttamente al DB
    inventoryModel = moduleFixture.get<Model<InventoryMongo>>(
      getModelToken(InventoryMongo.name),
    );
  });

  // Eseguito dopo ogni singolo test si fa pulizia dei dati
  afterEach(async () => {
    await inventoryModel.deleteMany
  });

  // Eseguito una sola volta alla fine di tutti i test chiude l'app
  afterAll(async () => {
    await app.close(); // chiude connessioni, Mongo, ecc.
  });

  //Test: salva un prodotto e verifica che sia recuperabile
  it('dovrebbe creare e trovare un prodotto direttamente in Mongo', async () => {
    await inventoryModel.create(product); // inserisce il prodotto nel DB

    const result = await inventoryModel.findOne({ id: 123 }).lean(); // cerca il prodotto

    expect(result).toBeDefined(); // verifica che sia stato trovato
    expect(result?.name).toBe('TestProdotto'); // verifica che abbia il nome atteso
  });

  //Test: cancella tutto e verifica che il DB sia vuoto
  it('dovrebbe eliminare tutti i prodotti', async () => {
    await inventoryModel.create(product); 
    await inventoryModel.deleteMany({}); 

    const all = await inventoryModel.find(); // controlla che non ci sia nulla
    expect(all).toHaveLength(0); 
  });
});
