// Cambiare il nome del model
export class StockAddedDto {
  public readonly warehouseId: string;
  public readonly barCode: string;
  public readonly productName: string;
  public readonly unitaryPrice: number;
  public quantity: number;
  public readonly minQuantity?: number;
  public readonly maxQuantity?: number;
}
