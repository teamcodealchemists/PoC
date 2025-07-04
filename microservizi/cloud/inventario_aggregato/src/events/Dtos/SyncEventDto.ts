export class SyncEventDto {
    public readonly barCode: string;
    public readonly productName?: string;
    public readonly unitaryPrice?: number;    
    public readonly warehouseId: string;
    public quantity?: number;
    public readonly minQuantity?: number;
    public readonly maxQuantity?: number;    
    public readonly eventType?: string;
    public readonly timestamp?: string;
    public readonly source?: string;
}