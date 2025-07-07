import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          // Configura qui i parametri di connessione NATS se necessario
          servers: [process.env.NATS_URL || 'nats://nats']
        }
      }
    ]),
    ],
    exports: [
        ClientsModule
    ]

})
export class NatsClientModule {}
