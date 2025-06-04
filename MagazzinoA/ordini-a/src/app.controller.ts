import { Controller, Post, Body, Inject, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    @Inject('ORDINE_SERVICE') private readonly client: ClientProxy,
    private readonly appService: AppService,
  ) {}


  @Post('crea-ordine')
  async creaOrdine(@Body() body: any) {
    const ordine = {
      id: Math.floor(Math.random() * 1000),
      prodotto: body.prodotto,
      quantita: body.quantita,
    };

    // Pubblica evento su NATS
    this.client.emit('ordine_creato', ordine);
    console.log(`Creato ordine di ${ordine.quantita} ${ordine.prodotto} (ID: ${ordine.id})`);
     
    const ordine2 = { id: Date.now(), prodotto: 'banana', quantita: 1 };
    client.emit('ordine_creato', ordine2);
    console.log(' Evento ordine_creato inviato automaticamente', ordine2);

      
    return { message: 'Ordine inviato', ordine };
  }

    

  


}
