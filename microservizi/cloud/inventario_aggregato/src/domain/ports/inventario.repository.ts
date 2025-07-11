import { Inventory } from '../models/inventario.model';

import { SyncEventDto } from 'src/events/Dtos/SyncEventDto';

export interface InventoryRepository {
  findAll(): Promise<Inventory[]>;
  findAllProduct(): Promise<Inventory[]>;
  syncAddStock(stock: SyncEventDto): Promise<void>;
  syncRemoveStock(stock: SyncEventDto): Promise<void>;
  syncEditStock(stock: SyncEventDto): Promise<void>;
}
