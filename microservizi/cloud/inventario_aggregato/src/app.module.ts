import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './interfaces/http/app.controller';
import { AppService } from './application/app.service';

import {
  CloudInventoryMongo,
  InventorySchema,
} from './infrastructure/schemas/inventario.schema';
import { InventoryRepositoryMongo } from './infrastructure/adapters/mongo_db/inventario.repository.impl';

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
  controllers: [AppController],
  providers: [
    AppService,
    { provide: 'InventoryRepository', useClass: InventoryRepositoryMongo },
  ],
})
export class AppModule {}
