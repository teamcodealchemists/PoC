import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'productInWarehouse' })
export class ProductInWarehouse {
  @Prop({ required: true })
  warehouseId: string;

  @Prop({ required: true })
  barCode: string;

  @Prop({ required: true })
  quantity: number;

  @Prop()
  minQuantity: number;

  @Prop()
  maxQuantity: number;
}

export const productInWarehouseSchema =
  SchemaFactory.createForClass(ProductInWarehouse);

// Aggiunge l'indice composto univoco per warehouseId + barCode
productInWarehouseSchema.index({ warehouseId: 1, barCode: 1 }, { unique: true });