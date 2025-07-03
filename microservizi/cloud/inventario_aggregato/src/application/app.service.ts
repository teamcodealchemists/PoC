
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

  async findAllProduct() {
    return this.inventoryRepo.findAllProduct();
  }

  async getInventory() {
    return this.inventoryRepo.findAll();
  }

  async findAll() {
    return this.inventoryRepo.findAll();
  }

  async syncAddStock(stock: any) {
    return this.inventoryRepo.syncAddStock(stock);
  }

  async syncRemoveStock(stock: any) {
    return this.inventoryRepo.syncRemoveStock(stock);
  }

  async syncEditStock(stock: any) {
    return this.inventoryRepo.syncEditStock(stock);
  }
}

