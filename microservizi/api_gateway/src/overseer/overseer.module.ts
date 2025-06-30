import { Module } from '@nestjs/common';
import { OverseerController } from './overseer.controller';
import { NatsClientModule } from '../nats-client/natsClient.module';

@Module({
  imports: [NatsClientModule],
  controllers: [OverseerController],
  providers: [],
})
export class OverseerModule {}