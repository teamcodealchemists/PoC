export class Inventario {
  constructor(
    public readonly codice_barre: string,
    public readonly nome_prodotto: string,
    public readonly prezzo_unitario: number,
    public readonly quantita: number,
    public readonly quantita_minima?: number,
    public readonly quantita_massima?: number,
  ) {}
}
