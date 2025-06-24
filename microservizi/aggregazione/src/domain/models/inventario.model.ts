// Cambiare il nome del model
export class Inventory {
  constructor(
    public readonly barCode: string,
    public readonly productName: string,
    public readonly unitaryPrice : number,
    public  quantity: number,
    public readonly minQuantity?: number,
    public readonly maxQuantity?: number,
  ) {}
}
