
import { Injectable, Inject } from '@nestjs/common';
import { InventarioRepository } from '../domain/ports/inventario.repository';
// import { InventarioMongo as Inventario, InventarioDocument } from '../infrastructure/schemas/inventario.schema';
// import { CreaProdottoDto } from '../interfaces/http/dto/crea-prodotto.dto';


@Injectable()
export class AppService {
  constructor(
    @Inject('InventarioRepository')
    private readonly inventoryRepo: InventarioRepository,
  ) {}

  async findProduct(barCode: string) {
    return this.inventoryRepo.findByBarCode(barCode);
  }

  async getInventory() {
    return this.inventoryRepo.findAll();
  }
}

