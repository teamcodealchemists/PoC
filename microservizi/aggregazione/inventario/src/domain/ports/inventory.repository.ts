import { ConcreteProduct } from "../core/concreteProduct";
import { Product } from "../core/product";

export interface InventoryRepository {
  findAll(): Promise<ConcreteProduct[]>;
  findById(id: number): Promise<ConcreteProduct | null>;
  getTotalQuantity(): Promise<number>;
  addProduct(product: ConcreteProduct): Promise<Product>;
  removeById(id: number): Promise<boolean>;
  updateProduct(id: number, productEdit: ConcreteProduct): Promise<Product | null>;
}
