import { Module } from '@nestjs/common';

import { AppController } from './interfaces/http/app.controller';
import { AppService } from './application/app.service';

import { InventoryRepositoryMongo } from './infrastructure/adapters/mongo_db/inventario.repository.impl';

import {MongoModule} from './infrastructure/module/mongo.module';

@Module({
  imports: [
      MongoModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: 'InventoryRepository', useClass: InventoryRepositoryMongo },
  ],
})
export class AppModule {}
