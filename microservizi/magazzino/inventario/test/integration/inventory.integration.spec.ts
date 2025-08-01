import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
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

describe('🧪 Inventory Integration Tests', () => {
//Verifica connessione NATS
  describe('NATS Connection Only', () => {
    let app: INestApplication;
    let client: ClientProxy;

    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({}).compile();

      app = moduleFixture.createNestApplication();
      app.connectMicroservice({
        transport: Transport.NATS,
        options: { servers: ['nats://localhost:4222'] },
      });

      await app.startAllMicroservices();
      await app.init();

      client = ClientProxyFactory.create({
        transport: Transport.NATS,
        options: { servers: ['nats://localhost:4222'] },
      });

      await client.connect();
    });

    afterAll(async () => {
      await client.close();
      await app.close();
    });

    it('dovrebbe connettersi correttamente a NATS', () => {
      expect(client).toBeDefined();
    });
  });

  //Verifica scrittura su Mongo invocando la logica direttamente
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

  // Accesso diretto a MongoDB (isolato)
  describe('MongoDB Raw Access', () => {
    let app: INestApplication;
    let inventoryModel: Model<InventoryMongo>;

    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [
          MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://localhost:27017/inventory'),
          MongooseModule.forFeature([{ name: InventoryMongo.name, schema: InventorySchema }]),
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

    it('dovrebbe creare e trovare un prodotto direttamente in Mongo', async () => {
      await inventoryModel.create(product);
      const result = await inventoryModel.findOne({ id: 123 }).lean();
      expect(result).toBeDefined();
      expect(result?.name).toBe('TestProdotto');
    });

    it('dovrebbe eliminare tutti i prodotti', async () => {
      await inventoryModel.create(product);
      await inventoryModel.deleteMany({});
      const all = await inventoryModel.find();
      expect(all).toHaveLength(0);
    });
  });
});
