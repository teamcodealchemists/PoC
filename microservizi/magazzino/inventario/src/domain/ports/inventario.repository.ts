import { Inventario } from '../models/inventario.model';

export interface InventarioRepository {
  findAll(): Promise<Inventario[]>;
  findByCodiceBarre(codice: string): Promise<Inventario | null>;
  getQuantitaTotale(): Promise<number>;
  aggiungiProdotto(prodotto: Inventario): Promise<Inventario>;
  removeByCodiceBarre(codice: string): Promise<boolean>;
  aggiornaQuantita(codice: string, nuovaQuantita: number): Promise<Inventario | null>;
}
