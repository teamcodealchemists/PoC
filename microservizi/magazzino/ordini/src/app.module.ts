import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderController } from './interfaces/http/app.controller';

// Schemi
import { InternalOrderMongo, InternalOrderSchema } from './infrastructure/schemas/internalOrder.schema';
import { ExternalOrderMongo, ExternalOrderSchema } from './infrastructure/schemas/externalOrder.schema';

// Repository
import { InternalOrderRepositoryMongo } from './infrastructure/adapters/mongo_db/internalOrder.repository.impl';
import { ExternalOrderRepositoryMongo } from './infrastructure/adapters/mongo_db/externalOrder.repository.impl';

@Module({
  imports: [
  MongooseModule.forRoot('mongodb://mongo:27017/orders', {
    connectionName: 'orders',
  }),

MongooseModule.forFeature(
  [{ name: InternalOrderMongo.name, schema: InternalOrderSchema, collection: 'internalOrders' }],
  'orders'
),
MongooseModule.forFeature(
  [{ name: ExternalOrderMongo.name, schema: ExternalOrderSchema, collection: 'externalOrders' }],
  'orders'
)],
  controllers: [OrderController],
  providers: [
    InternalOrderRepositoryMongo,
    ExternalOrderRepositoryMongo,
  ],
})
export class AppModule {}
