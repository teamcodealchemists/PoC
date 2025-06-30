import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InventoryDocument = CloudInventoryMongo & Document;

@Schema({ collection: 'inventory' })
export class CloudInventoryMongo {
  @Prop({ required: true })
  barCode: string;

  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  unitaryPrice: number;

  @Prop({ required: true })
  quantity: number;

  @Prop()
  minQuantity: number;

  @Prop()
  maxQuantity: number;
}

export const InventorySchema = SchemaFactory.createForClass(CloudInventoryMongo);
