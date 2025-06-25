import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderController } from './interfaces/http/app.controller';

// Schemi
import { SupplyOrderMongo, SupplyOrderSchema } from './infrastructure/schemas/supplyOrder.schema';
import { InternalOrderMongo, InternalOrderSchema } from './infrastructure/schemas/internalOrder.schema';
import { ExternalOrderMongo, ExternalOrderSchema } from './infrastructure/schemas/externalOrder.schema';

// Repository
import { SupplyOrderRepositoryMongo } from './infrastructure/adapters/mongo_db/supplyOrder.repository.impl';
import { InternalOrderRepositoryMongo } from './infrastructure/adapters/mongo_db/internalOrder.repository.impl';
import { ExternalOrderRepositoryMongo } from './infrastructure/adapters/mongo_db/externalOrder.repository.impl';

@Module({
  imports: [
  MongooseModule.forRoot('mongodb://mongo:27017/orderInternal', {
    connectionName: 'internal',
  }),
  MongooseModule.forRoot('mongodb://mongo:27017/orderExternal', {
    connectionName: 'external',
  }),
  MongooseModule.forRoot('mongodb://mongo:27017/orderSupply', {
    connectionName: 'supply',
  }),

  MongooseModule.forFeature(
    [{ name: SupplyOrderMongo.name, schema: SupplyOrderSchema }],
    'supply'
  ),
  MongooseModule.forFeature(
    [{ name: InternalOrderMongo.name, schema: InternalOrderSchema }],
    'internal'
  ),
  MongooseModule.forFeature(
    [{ name: ExternalOrderMongo.name, schema: ExternalOrderSchema }],
    'external'
  ),
],
  controllers: [OrderController],
  providers: [
    SupplyOrderRepositoryMongo,
    InternalOrderRepositoryMongo,
    ExternalOrderRepositoryMongo,
  ],
})
export class AppModule {}
