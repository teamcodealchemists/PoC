import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
//Risolvere il problema del linter che non trova il modulo ConfigService

const ID_MAGAZZINO = new ConfigService().get('ID_MAGAZZINO'); // oppure usa DI

@Injectable()
export class AppService {
  getHello(): string {
    return 'CIAO SONO IL MAGAZZINO ' + ID_MAGAZZINO;
  }
}
