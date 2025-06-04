import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('INVENTARIO_SERVICE') private readonly client: ClientProxy,
  ) {}

   async  onModuleInit() {
      console.log(' onModuleInit avviato');
  await this.client.connect(); 
    setInterval(() => {
      const ordine = { id: Date.now(), prodotto: 'banana', quantita: 1 };
      this.client.emit('ordine_creato', ordine);
      console.log('(GENERATO AUTOMATICAMENTE) Evento ordine_creato inviato automaticamente', ordine);
    }, 2000);
  }

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
