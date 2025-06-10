import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InventarioDocument = Inventario & Document;

@Schema({ collection: 'inventario' })
export class Inventario {
  @Prop({ required: true })
  codice_barre: string;

  @Prop({ required: true })
  quantita: number;

  @Prop()
  quantita_minima: number;

  @Prop()
  quantita_massima: number;

  @Prop({ type: Number, required: true })
  id_categoria: number;
}

export const InventarioSchema = SchemaFactory.createForClass(Inventario);
