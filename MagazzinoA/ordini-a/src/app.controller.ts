import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async creaOrdine() {
    return this.appService.creaOrdineConInventario();
  }
}
