import { Module } from '@nestjs/common';
import { SagaMessagesService } from '../../../application/saga-messages.service';
import { SagaMessagesController } from './saga-messages.controller';
import { InventoryRepositoryMongo } from 'src/infrastructure/adapters/mongo_db/inventory.repository.impl';
import { MongoModule } from 'src/infrastructure/adapters/mongo_db/mongo.module';

@Module({
  imports: [MongoModule],
  controllers: [SagaMessagesController],
  providers: [
    SagaMessagesService
  ],
})
export class SagaMessagesModule {}
