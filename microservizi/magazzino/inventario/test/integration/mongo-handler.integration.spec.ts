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
    let app: INestApplication;
    let inventoryModel: Model<InventoryMongo>;

    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [
          MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://localhost:27017/inventory'),
          MongooseModule.forFeature([{ name: InventoryMongo.name, schema: InventorySchema }]),
        ],
    providers: [
      InventoryHandlerService,
      {
        provide: 'InventoryRepository',
        useClass: InventoryRepositoryMongo,
      },
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

      app = moduleFixture.createNestApplication();
      await app.init();

      inventoryModel = moduleFixture.get<Model<InventoryMongo>>(getModelToken(InventoryMongo.name));
    });

    afterEach(async () => {
      await inventoryModel.deleteMany({});
    });

    afterAll(async () => {
      await app.close();
    });

    it('dovrebbe salvare un prodotto direttamente su Mongo (senza NATS)', async () => {
      await inventoryModel.create(product);

      const saved = await inventoryModel.findOne({ id: 123 }).lean();
      expect(saved).toBeDefined();
      expect(saved?.name).toBe('TestProdotto');
    });
  });