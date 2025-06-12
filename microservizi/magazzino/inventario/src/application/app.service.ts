

import { Injectable, Inject } from '@nestjs/common';
import { InventarioRepository } from '../domain/ports/inventario.repository';

@Injectable()
export class AppService {
  constructor(
    @Inject('InventarioRepository')
    private readonly inventarioRepo: InventarioRepository,
  ) {}

  async getQuantitaTotale(): Promise<number> {
    return this.inventarioRepo.getQuantitaTotale();
  }

  async getInventarioCompleto() {
    return this.inventarioRepo.findAll();
  }
}

