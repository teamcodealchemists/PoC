import { Module } from '@nestjs/common';
import { EventsMicroserviceController } from './events.controller';
import { EventsService } from './events.service';

import { MongoModule } from 'src/infrastructure/module/mongo.module';

@Module({
  imports: [MongoModule],
  controllers: [EventsMicroserviceController],
  providers: [EventsService],
  exports: [EventsService]
})
export class EventsMicroserviceModule {}
