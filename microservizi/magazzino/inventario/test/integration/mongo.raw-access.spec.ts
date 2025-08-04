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