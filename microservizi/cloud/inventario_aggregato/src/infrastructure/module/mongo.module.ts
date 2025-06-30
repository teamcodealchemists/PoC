import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppService } from '../../application/app.service';

import {
  CloudInventoryMongo,
  InventorySchema,
} from '../schemas/inventario.schema';
import { InventoryRepositoryMongo } from '../adapters/mongo_db/inventario.repository.impl';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGO_URL || 'mongodb://mongo:27017/inventario',
    ),
    MongooseModule.forFeature([
      { name: CloudInventoryMongo.name, schema: InventorySchema },
    ]),
  ],
  controllers: [],
  providers: [
    AppService,
    { provide: 'InventoryRepository', useClass: InventoryRepositoryMongo },
  ],
})
export class MongoModule {}
