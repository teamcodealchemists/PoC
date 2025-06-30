// Se usabile

import { Module } from '@nestjs/common';
import { EventsMicroserviceController } from './events.controller';
import { NatsClientModule } from '';

@Module({
  imports: [NatsClientModule],
  controllers: [EventsMicroserviceController],
  providers: [],
})
export class EventsMicroserviceModule {}
