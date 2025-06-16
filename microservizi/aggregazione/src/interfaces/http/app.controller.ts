import { Controller, Get, Param, Post, Body, Delete, Patch} from '@nestjs/common';
import { AppService } from '../../application/app.service';
import { CreaProdottoDto } from './dto/crea-prodotto.dto';
import { AggiornaQuantitaDto } from './dto/aggiorna-quantita.dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

   @Get()
  getHello(): string {
    return 'Hello World!';
  }
  @Get('whoareyou')
  async getInfo(): Promise<string> {
    const quantitaTotale = await this.appService.getQuantitaTotale();
    return `Ciao sono il magazzino '1' ed ho ${quantitaTotale} prodotti`;
  }


@Get('prodotto/:codice')
trovaProdotto(@Param('codice') codice: string) {
  return this.appService.trovaProdotto(codice);
}

 @Post('aggiungi_prodotto')
  async aggiungiProdotto(@Body() nuovoProdotto: CreaProdottoDto) {
    return this.appService.aggiungiProdotto(nuovoProdotto);
  }

  @Get('inventario')
getInventario() {
  return this.appService.getInventarioCompleto();
}

@Delete('rimuovi_prodotto/:codice')
async rimuoviProdotto(@Param('codice') codice: string) {
  const risultato = await this.appService.rimuoviProdotto(codice);
  if (risultato) {
    return { message: 'Prodotto rimosso con successo' };
  } else {
    return { message: 'Prodotto non trovato' };
  }
}

@Patch('modifica_quantita/:codice')
aggiornaQuantita(
  @Param('codice') codice: string,
  @Body() body: AggiornaQuantitaDto,
) {
  return this.appService.aggiornaQuantita(codice, body.quantita);
}

 @Get('a_rischio')
  async getProdottiARischio() {
    return this.appService.getProdottiARischio();
  }
}
