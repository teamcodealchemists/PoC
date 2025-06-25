import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OrderState } from '../../domain/core/orderState.enum';

export type InternalOrderDocument = InternalOrderMongo & Document;

@Schema({ collection: 'internal_orders' })
export class InternalOrderMongo {
  @Prop({ required: true })
  orderID: number;

  @Prop({ required: true })
  orderState: OrderState;

  @Prop({ required: true })
  creationDate: Date;

  @Prop({ required: true })
  timeToArrive: Date;

  @Prop({ required: true })
  idProduct: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  warehouseDeparture: number;

  @Prop({ required: true })
  warehouseDestination: number;
}

export const InternalOrderSchema = SchemaFactory.createForClass(InternalOrderMongo);
