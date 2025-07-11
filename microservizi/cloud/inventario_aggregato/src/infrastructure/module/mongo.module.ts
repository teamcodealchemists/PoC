import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppService } from 'src/application/app.service';
import { InventoryRepositoryMongo } from '../adapters/mongo_db/inventario.repository.impl';

import {
  ProductTable,
  productTableSchema,
} from '../schemas/productTable.schema';

import {
  ProductInWarehouse,
  productInWarehouseSchema,
} from '../schemas/productInWarehouse.schema';
import { AppController } from 'src/interfaces/http/app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGO_URL || 'mongodb://mongo:27017/inv_aggregato_db',
    ),
    MongooseModule.forFeature([
      {
        name: ProductTable.name,
        schema: productTableSchema,
      },
      {
        name: ProductInWarehouse.name,
        schema: productInWarehouseSchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
        {
      provide: 'InventoryRepository',
      useClass: InventoryRepositoryMongo,
    },
    InventoryRepositoryMongo
  ],
  exports: [
    InventoryRepositoryMongo,
    'InventoryRepository'
  ]
})
export class MongoModule {}
