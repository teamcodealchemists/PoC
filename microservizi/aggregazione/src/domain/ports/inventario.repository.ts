import { Inventory } from '../models/inventario.model';

export interface InventoryRepository{
  findAll(): Promise<Inventory[]>;
  findByBarCode(code: string): Promise<Inventory | null>;
}
