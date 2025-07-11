import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDetailDocument = OrderDetailMongo & Document;

@Schema({ collection: 'orderDetails' })
export class OrderDetailMongo {
  @Prop({ required: true })
  orderID: number;

  @Prop({ required: true })
  idProduct: number;

  @Prop({ required: true })
  nameProduct: string;    

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  unitaryPrice: number;
}

export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetailMongo);