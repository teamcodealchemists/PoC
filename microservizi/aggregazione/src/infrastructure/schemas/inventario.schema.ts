import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InventarioDocument = InventarioMongo & Document;

@Schema({ collection: 'inventario' })
export class InventarioMongo {
  @Prop({ required: true })
  codice_barre: string;

  @Prop({ required: true })
  nome_prodotto: string;

  @Prop({ required: true })
  prezzo_unitario: number;

  @Prop({ required: true })
  quantita: number;

  @Prop()
  quantita_minima: number;

  @Prop()
  quantita_massima: number;
}

export const InventarioSchema = SchemaFactory.createForClass(InventarioMongo);
