import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from '../../application/app.service';
// import { CreaProdottoDto } from './dto/crea-prodotto.dto';
// import { AggiornaQuantitaDto } from './dto/aggiorna-quantita.dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('whoareyou')
  async getInfo(): Promise<string> {
    return `Ciao! Sono il servizio di aggregazione Cloud!`;
  }

  @Get('prodotto/:codice')
  findProduct(@Param('codice') codice: string) {
    return this.appService.findProduct(codice);
  }

  @Get('inventario')
  getInventory() {
    return this.appService.getInventory();
  }

}