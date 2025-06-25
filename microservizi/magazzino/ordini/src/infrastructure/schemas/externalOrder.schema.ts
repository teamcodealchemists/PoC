import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OrderState } from '../../domain/core/orderState.enum';

export type ExternalOrderDocument = ExternalOrderMongo & Document;

@Schema({ collection: 'external_orders' })
export class ExternalOrderMongo {
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
  externalAddress: number;
}

export const ExternalOrderSchema = SchemaFactory.createForClass(ExternalOrderMongo);
