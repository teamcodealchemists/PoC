// Se usabile

import { Module } from '@nestjs/common';
import { EventsMicroserviceController } from './events.controller';
import { NatsClientModule } from '../nats-client/natsClient.module';

@Module({
  imports: [NatsClientModule],
  controllers: [EventsMicroserviceController],
  providers: [],
})
export class EventsMicroserviceModule {}
