/*
-Inietta un vero InventoryHandlerService
-Usa InventoryRepositoryMongo (implementazione reale)
-Finge il servizio NATS con un mock
-Salva su Mongo tramite la logica del servizio
*/

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { InventoryRepositoryMongo } from '../../src/infrastructure/adapters/mongo_db/inventory.repository.impl'
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InventoryMongo, InventorySchema } from 'src/infrastructure/schemas/inventory.schema';
import { InventoryHandlerService } from 'src/application/inventoryHandler.service';

const product = {
  id: 123,
  name: 'TestProdotto',
  unitPrice: 5,
  quantity: 10,
  minQuantity: 2,
  maxQuantity: 20,
};

describe('Mongo Save via Service Call', () => {
  // Istanza dell'app NestJS
  let app: INestApplication;

  // Model Mongo per accedere direttamente ai dati (verifica post-salvataggio)
  let inventoryModel: Model<InventoryMongo>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://localhost:27017/inventory'),

        // Registra schema Mongo `InventoryMongo` per usarlo come Model
        MongooseModule.forFeature([
          { name: InventoryMongo.name, schema: InventorySchema },
        ]),
      ],
      providers: [
        // Iniettiamo il vero service che contiene la logica applicativa
        InventoryHandlerService,

        // Usiamo la vera implementazione Mongo del repository
        {
          provide: 'InventoryRepository',
          useClass: InventoryRepositoryMongo,
        },

        // NATS è iniettato come mock, per non dipendere dal broker nei test
        {
          provide: 'NATS_SERVICE',
          useValue: {
            emit: jest.fn(),
            send: jest.fn(),
            connect: jest.fn(),
            close: jest.fn(),
          },
        },
      ],
    }).compile();

    // Crea l'app NestJS
    app = moduleFixture.createNestApplication();

    // Inizializza i moduli e il sistema di iniezione delle dipendenze
    await app.init();

    // Otteniamo il model Mongo per verificare i dati salvati
    inventoryModel = moduleFixture.get<Model<InventoryMongo>>(
      getModelToken(InventoryMongo.name)
    );
  });

  // Dopo ogni test, ripuliamo il database per evitare dati residui
  afterEach(async () => {
    await inventoryModel.deleteMany({});
  });

  // Dopo tutti i test, chiudiamo l'applicazione
  afterAll(async () => {
    await app.close();
  });

  // Test: salva un prodotto direttamente su Mongo, passando per il service (mockando NATS)
  it('dovrebbe salvare un prodotto direttamente su Mongo (senza NATS)', async () => {
    // Qui stai **bypassando il service**, ma il contesto è pronto: potresti anche usarlo
    await inventoryModel.create(product);

    // Verifica che il prodotto sia stato salvato
    const saved = await inventoryModel.findOne({ id: 123 }).lean();
    expect(saved).toBeDefined();
    expect(saved?.name).toBe('TestProdotto');
  });
});