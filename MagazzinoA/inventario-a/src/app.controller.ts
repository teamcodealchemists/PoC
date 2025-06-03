import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('verifica_inventario')
  handleVerificaInventario(data: { prodottoId: number; quantita: number }) {
    return this.appService.verificaDisponibilita(data.prodottoId, data.quantita);
  }
}
