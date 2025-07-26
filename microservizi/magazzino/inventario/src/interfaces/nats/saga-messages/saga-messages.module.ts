import { Module } from '@nestjs/common';
import { SagaMessagesService } from '../../../application/saga-messages.service';
import { SagaMessagesController } from './saga-messages.controller';
import { InventoryRepositoryMongo } from 'src/infrastructure/adapters/mongo_db/inventory.repository.impl';
import { MongoModule } from 'src/infrastructure/adapters/mongo_db/mongo.module';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [
    MongoModule,
    NatsClientModule
  ],
  controllers: [SagaMessagesController],
  providers: [
    SagaMessagesService
  ],
})
export class SagaMessagesModule {}
