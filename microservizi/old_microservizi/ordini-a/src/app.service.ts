import { Injectable , Logger} from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Prodotto } from './prodotto.interface'; 
@Injectable()
export class AppService {
 private readonly logger = new Logger(AppService.name);
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.NATS,
      options: {
        servers: ['nats://nats-inventario:4222'], // nome host del container NATS nel docker-compose
      },
    });
  }
  
  async inviaProdottoInventarioA(prodotto: Prodotto) {
    console.log('Mi connetto da ordine');
    await this.client.connect();
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log('Invio prodotto dal ordine a inventario :', prodotto);
    return this.client.emit('RichiestaInventariodaOrdine', prodotto);
  }
}
