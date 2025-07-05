import { InventoryHandlerService } from './application/inventoryHandler.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './interfaces/http/app.controller';

import { InventoryMongo, InventorySchema } from './infrastructure/schemas/inventory.schema';
import { InventoryRepositoryMongo } from './infrastructure/adapters/mongo_db/inventory.repository.impl';
import { SagaMessagesModule } from './interfaces/http/saga-messages/saga-messages.module';
import { MongoModule } from './infrastructure/adapters/mongo_db/mongo.module';

@Module({
  imports: [
    MongoModule,
    SagaMessagesModule,
  ],
  controllers: [AppController],
  providers: [
    InventoryHandlerService
    ]
})
export class AppModule {}
