import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderController } from './interfaces/http/app.controller';
import { OrderHandlerService } from './application/OrderHandler.service';

// Schemi
import { InternalOrderMongo, InternalOrderSchema } from './infrastructure/schemas/internalOrder.schema';
import { ExternalOrderMongo, ExternalOrderSchema } from './infrastructure/schemas/externalOrder.schema';
import { OrderDetailMongo, OrderDetailSchema } from './infrastructure/schemas/orderDetail.schema';

// Repository
import { InternalOrderRepositoryMongo } from './infrastructure/adapters/mongo_db/internalOrder.repository.impl';
import { ExternalOrderRepositoryMongo } from './infrastructure/adapters/mongo_db/externalOrder.repository.impl';
import { OrderDetailRepositoryMongo } from './infrastructure/adapters/mongo_db/orderDetail.repository.impl';

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
    ),
    MongooseModule.forFeature(
      [{ name: OrderDetailMongo.name, schema: OrderDetailSchema, collection: 'orderDetails' }],
      'orders'
    ),
  ],
  controllers: [OrderController],
  providers: [
    InternalOrderRepositoryMongo,
    ExternalOrderRepositoryMongo,
    OrderDetailRepositoryMongo,
    OrderHandlerService,
  ],
})
export class AppModule {}
