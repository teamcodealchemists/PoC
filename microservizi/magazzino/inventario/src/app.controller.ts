import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

@Get('whoareyou')
  async getHello(): Promise<string> {
    const quantitaAlimentari = await this.appService.getQuantitaProdottiAlimentari();
    return `Ciao sono il Magazzino '1' ed ho ${quantitaAlimentari} prodotti di categoria Alimentari`;
  }
}
