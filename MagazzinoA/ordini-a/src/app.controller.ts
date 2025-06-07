  import { Controller, Logger } from '@nestjs/common';
  import { AppService } from './app.service';
  import { Client, ClientProxy, EventPattern, MessagePattern, Transport, Payload } from '@nestjs/microservices';
  import { Prodotto } from './prodotto.interface';
  @Controller()
  export class AppController {
    private readonly logger = new Logger(AppController.name);
    constructor(private readonly appService: AppService) {}
    
    @EventPattern('RichiestaOrdinedaInventario')
    handleRicezioneProdotto(@Payload() prodotto: Prodotto) {
      console.log('📦 Prodotto ricevuto da inventario a', prodotto);
    }
  }
