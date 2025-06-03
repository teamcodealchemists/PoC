
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDINE_SERVICE',           
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats:4222'],  
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
