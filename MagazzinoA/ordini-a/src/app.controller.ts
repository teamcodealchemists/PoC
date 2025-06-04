import { Controller, Get, Body, Inject, Post  } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
  @Inject('ORDINE_SERVICE') private readonly client: ClientProxy,
  private readonly appService: AppService
) {}

@Post('crea-ordine')
  async creaOrdine(@Body() body: any) {
    const ordine = {
      id: Math.floor(Math.random() * 1000),
      prodotto: body.prodotto,
      quantita: body.quantita,
    };

    async onModuleInit() {
    setInterval(() => {
      const ordine = { id: Date.now(), prodotto: 'banana', quantita: 1 };
      this.client.emit('ordine_creato', ordine);
      console.log('(GENERATO AUTOMATICAMENTE).. Evento ordine_creato inviato automaticamente', ordine);
    }, 10000); // ogni 10 secondi
  }

    // 📢 Pubblica evento su NATS
    this.client.emit('ordine_creato', ordine);
    console.log(`Creato ordine di ${ordine.quantita} ${ordine.prodotto} (ID: ${ordine.id})`);
    return { message: 'Ordine inviato', ordine };
  }
}
