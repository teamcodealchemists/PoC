import { StockRemovedDto } from 'src/events/Dtos/StockRemovedDto';
import { Inventory } from '../models/inventario.model';

import { StockAddedDto } from 'src/events/Dtos/StockAddedDto';

export interface InventoryRepository {
  findAll(): Promise<Inventory[]>;
  findAllProduct(): Promise<Inventory[]>;
  stockAdded(stock: StockAddedDto);
  stockRemoved(stock: StockRemovedDto);
  syncAddStock(stock: StockAddedDto): Promise<void>;
  syncRemoveStock(stock: StockRemovedDto): Promise<void>;
  syncEditStock(stock: StockAddedDto): Promise<void>;
}
