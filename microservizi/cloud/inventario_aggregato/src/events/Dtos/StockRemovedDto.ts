export class StockRemovedDto {
  public readonly warehouseId: string;
  public readonly barCode: string;
  public quantity?: number; // Assicurati che questo campo sia presente
}
