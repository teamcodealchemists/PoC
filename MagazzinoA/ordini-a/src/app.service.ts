import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('INVENTARIO_SERVICE') private readonly client: ClientProxy,
  ) {}



  async creaOrdineConInventario() {
    const response = await this.client.send('verifica_inventario', {
      prodottoId: 123,
      quantita: 2,
    }).toPromise();

    return {
      ordineCreato: response.disponibile,
      messaggio: response.disponibile ? 'Ordine confermato' : 'Prodotto non disponibile',
    };
  }
}
