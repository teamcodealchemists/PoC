import { StockRemovedDto } from 'src/events/Dtos/StockRemovedDto';
import { Inventory } from '../models/inventario.model';

import { StockAddedDto } from 'src/events/Dtos/StockAddedDto';

export interface InventoryRepository {
  findAll(): Promise<Inventory[]>;
  findByBarCode(code: string): Promise<Inventory | null>;
  stockAdded(stock: StockAddedDto): Promise<void>;
  stockRemoved(stock: StockRemovedDto): Promise<void>;
}
