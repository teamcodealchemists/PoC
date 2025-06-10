import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

@Get('whoareyou')
  async getHello(): Promise<string> {
    const quantitaAlimentari = await this.appService.getQuantitaProdottiAlimentari();
    return `Ciao sono il magazzino 1 e ho ${quantitaAlimentari} prodotti di categoria Alimentari`;
  }
}
