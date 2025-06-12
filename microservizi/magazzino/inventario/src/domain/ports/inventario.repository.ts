import { Inventario } from '../models/inventario.model';

export interface InventarioRepository {
  findAll(): Promise<Inventario[]>;
  findByCodiceBarre(codice: string): Promise<Inventario | null>;
  getQuantitaTotale(): Promise<number>;
}
