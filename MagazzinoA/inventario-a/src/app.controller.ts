
import { EventPattern, Payload } from '@nestjs/microservices';
import { Controller, Post, Body } from '@nestjs/common';

@Controller()
export class AppController {
  @EventPattern('ordine_creato')
  handleOrdineCreato(@Payload() data: any) {
    console.log('Inventario ha ricevuto ordine:', data);
    // Logica: riduci stock, notifica, ecc.
  }
}
