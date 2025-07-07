import { InventoryHandlerService } from './application/inventoryHandler.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppController } from './interfaces/http/app.controller';

import { InventoryMongo, InventorySchema } from './infrastructure/schemas/inventory.schema';
import { InventoryRepositoryMongo } from './infrastructure/adapters/mongo_db/inventory.repository.impl';
import { SagaMessagesModule } from './interfaces/http/saga-messages/saga-messages.module';
import { MongoModule } from './infrastructure/adapters/mongo_db/mongo.module';

@Module({
  imports: [
    MongoModule,
    SagaMessagesModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://mongo:27017/inventory'),
    MongooseModule.forFeature([
      { name: InventoryMongo.name, schema: InventorySchema },
    ]),
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          // Configura qui i parametri di connessione NATS se necessario
          servers: [process.env.NATS_URL || 'nats://nats']
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    InventoryHandlerService,
    { provide: 'InventoryRepository', useClass: InventoryRepositoryMongo }]
})
export class AppModule {}
