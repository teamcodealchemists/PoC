import { Module } from '@nestjs/common';
import {MongoModule} from './infrastructure/module/mongo.module';
import { AppController } from './interfaces/http/app.controller';
import { AppService } from './application/app.service';
import { EventsMicroserviceModule } from './events/events.module';

@Module({
  imports: [
      MongoModule,
      EventsMicroserviceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
