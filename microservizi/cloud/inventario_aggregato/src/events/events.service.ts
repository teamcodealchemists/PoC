import { Injectable, Inject } from '@nestjs/common';
import { InventoryRepository } from '../domain/ports/inventario.repository';


@Injectable()
export class EventsService {
  constructor(
    @Inject('InventoryRepository')
    private readonly inventoryRepo: InventoryRepository,
  ) {}
  
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
