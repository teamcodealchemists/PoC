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
