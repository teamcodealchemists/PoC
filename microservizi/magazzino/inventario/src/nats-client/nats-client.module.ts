import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OutboundRequestSerializer } from 'src/interfaces/nats/serializer/outbound-request.serializer';


@Module({
    imports: [
        ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          // Configura qui i parametri di connessione NATS se necessario
          servers: [process.env.NATS_URL || 'nats://nats'],
          serializer: new OutboundRequestSerializer(),
        }
      }
    ]),
    ],
    exports: [
        ClientsModule
    ]

})
export class NatsClientModule {}
