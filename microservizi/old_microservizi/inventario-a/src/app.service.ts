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
  
    async inviaProdottoAlOrdineA(prodotto: Prodotto) {
      console.log('Mi connetto da inventario');
      await this.client.connect();

      // Ritardo di 2-3 secondi per attendere l'avvio di ordini-a
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log('Invio prodotto al OrdineA:', prodotto);
      return this.client.emit('RichiestaOrdinedaInventario', prodotto);
    }
}
