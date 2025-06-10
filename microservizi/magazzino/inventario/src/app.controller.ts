import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    const quantitaAlimentari = await this.appService.getQuantitaProdottiAlimentari();
    return `Ciao sono il magazzino ${this.appService.getIdMagazzino()} e ho ${quantitaAlimentari} prodotti di categoria Alimentari`;
  }
}
