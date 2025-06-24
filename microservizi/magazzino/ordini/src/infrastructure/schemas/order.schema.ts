import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InventoryDocument = InventoryMongo & Document;

@Schema({ collection: 'inventory' })
export class InventoryMongo {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  unitPrice: number;

  @Prop({ required: true })
  quantity: number;

  @Prop()
  minQuantity: number;

  @Prop()
  maxQuantity: number;
}

export const InventorySchema = SchemaFactory.createForClass(InventoryMongo);
