import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'productTable' })
export class ProductTable {
  @Prop({ unique: true, required: true })
  barCode: string;

  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  unitaryPrice: number;
}

export const productTableSchema = 
  SchemaFactory.createForClass(ProductTable);
