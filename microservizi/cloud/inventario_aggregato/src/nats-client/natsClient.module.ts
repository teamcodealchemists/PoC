import { Module, Global } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          // Cambia l'URL se necessario
          url: 'nats://nats',
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class NatsClientModule {}
