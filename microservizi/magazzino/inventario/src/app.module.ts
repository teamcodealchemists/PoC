import { InventoryHandlerService } from './application/inventoryHandler.service';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './interfaces/nats/app.controller';

import { SagaMessagesModule } from './interfaces/nats/saga-messages/saga-messages.module';
import { MongoModule } from './infrastructure/adapters/mongo_db/mongo.module';
import { NatsClientModule } from './nats-client/nats-client.module';
import { BootstrapModule } from './application/bootstrap.module';

@Module({
  imports: [
    MongoModule,
    SagaMessagesModule,
    ConfigModule.forRoot(),
    NatsClientModule,
    BootstrapModule
  ],
  controllers: [AppController],
  providers: [
    InventoryHandlerService
  ]
})
export class AppModule {}