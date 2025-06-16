
import { Injectable, Inject } from '@nestjs/common';
import { InventarioRepository } from '../domain/ports/inventario.repository';
import { InventarioMongo as Inventario, InventarioDocument } from '../infrastructure/schemas/inventario.schema';
import { CreaProdottoDto } from '../interfaces/http/dto/crea-prodotto.dto';
import { NatsJetStreamClientProxy } from '@nestjs-plugins/nestjs-nats-jetstream-transport';


interface newProductEvent {
  id: number;
  product: string;
  quantity: number;
}


@Injectable()
export class AppService {
  constructor(
    @Inject('InventarioRepository')
    private readonly inventarioRepo: InventarioRepository,
    private client: NatsJetStreamClientProxy
  ) {}

  async trovaProdotto(codice: string) {
  return this.inventarioRepo.findByCodiceBarre(codice);
}

  async getQuantitaTotale(): Promise<number> {
    return this.inventarioRepo.getQuantitaTotale();
  }

  async getInventarioCompleto() {
    return this.inventarioRepo.findAll();
  }
  
 async aggiungiProdotto(nuovoProdotto: CreaProdottoDto) {
  // Al momento viene pubblicato l'evento prima dell'effettiva aggiunta del prodotto. Da sistemare
  this.client
    .emit<newProductEvent>('Prodotto inserito', {
      id: nuovoProdotto.codice_barre,
      product: nuovoProdotto.nome_prodotto,
      quantity: nuovoProdotto.quantita,
    })

  return this.inventarioRepo.aggiungiProdotto(nuovoProdotto);
}

async rimuoviProdotto(codice: string): Promise<boolean> {
  return this.inventarioRepo.removeByCodiceBarre(codice);
}

async aggiornaQuantita(codice: string, nuovaQuantita: number) {
  return this.inventarioRepo.aggiornaQuantita(codice, nuovaQuantita);
}

async getProdottiARischio() {
    return this.inventarioRepo.findProdottiARischio();
  }

}

