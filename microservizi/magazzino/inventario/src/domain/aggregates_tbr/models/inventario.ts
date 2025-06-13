import { Prodotto } from './prodotto';

export abstract class Inventario {
    constructor(
        private Prodotto: Prodotto[]
    ) {}

    public abstract getStock(id:number): Prodotto | null;
    public abstract getAllStock(): Prodotto[] | null;
    public abstract newStock(prodotto:Prodotto): void;
    public abstract removeStock(id:number): void;
    public abstract editStock(prodotto:Prodotto): void;
}