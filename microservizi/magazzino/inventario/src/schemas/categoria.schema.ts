import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoriaDocument = Categoria & Document;

@Schema({ collection: 'categorie', _id: false })
export class Categoria {
  @Prop({ type: Number, required: true })
  _id: number;

  @Prop({ required: true })
  nome_categoria: string;
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);
