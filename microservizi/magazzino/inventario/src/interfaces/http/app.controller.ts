import { Controller, Get } from '@nestjs/common';
import { AppService } from '../../application/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('whoareyou')
  async getInfo(): Promise<string> {
    const quantitaTotale = await this.appService.getQuantitaTotale();
    return `Ciao sono il magazzino '1' ed ho ${quantitaTotale} prodotti`;
  }
}
