import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const ID_MAGAZZINO = new ConfigService().get('ID_MAGAZZINO');

@Injectable()
export class AppService {
  getHello(): string {
    console.log('Ciao sono un LOG di test');
    return 'Ciao Sono il microservizio Inventario '+ID_MAGAZZINO;
  }
}
