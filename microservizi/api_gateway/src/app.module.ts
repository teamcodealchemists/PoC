import { Module } from '@nestjs/common';
import { OverseerModule } from './overseer/overseer.module';

@Module({
  imports: [OverseerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}