import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import {
  ProductTable,
  productTableSchema,
} from '../schemas/productTable.schema';

import {
  ProductInWarehouse,
  productInWarehouseSchema,
} from '../schemas/productInWarehouse.schema';

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
  controllers: [],
  providers: [],
})
export class MongoModule {}
