import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  verificaDisponibilita(prodottoId: number, quantita: number) {
    // Logica fittizia
    const disponibile = quantita <= 10;
    return { disponibile };
  }
}
