import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

@Post('crea-ordine')
  async creaOrdine(@Body() body: any) {
    const ordine = {
      id: Math.floor(Math.random() * 1000),
      prodotto: body.prodotto,
      quantita: body.quantita,
    };

    // 📢 Pubblica evento su NATS
    this.client.emit('ordine_creato', ordine);
    return { message: 'Ordine inviato', ordine };
    console.log("Creato ordine di "+ quantita + " "+prodotto+ "(ID:"+id+")"); 
  }
}
