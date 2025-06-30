
import { Injectable, Inject } from '@nestjs/common';
import { InventoryRepository } from '../domain/ports/inventario.repository';
// import { InventarioMongo as Inventario, InventarioDocument } from '../infrastructure/schemas/inventario.schema';
// import { CreaProdottoDto } from '../interfaces/http/dto/crea-prodotto.dto';


@Injectable()
export class AppService {
  constructor(
    @Inject('InventoryRepository')
    private readonly inventoryRepo: InventoryRepository,
  ) {}

  async findProduct(barCode: string) {
    return this.inventoryRepo.findByBarCode(barCode);
  }

  async getInventory() {
    return this.inventoryRepo.findAll();
  }
}

