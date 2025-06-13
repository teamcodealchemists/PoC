export abstract class Prodotto {
    constructor(
        protected id: number,
        protected nome: string,
        protected prezzoUnitario: number,
        protected quantita: number,
        protected quantitaMinima: number,
        protected quantitaMassima: number
    ) {}

    public abstract getId(): number;
    public abstract getNome(): string;
    public abstract getPrezzoUnitario(): number;
    public abstract getQuantita(): number;
    public abstract getQuantitaMinima(): number;
    public abstract getQuantitaMassima(): number;
}