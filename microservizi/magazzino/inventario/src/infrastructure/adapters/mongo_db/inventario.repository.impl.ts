import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InventarioRepository } from '../../../domain/ports/inventario.repository';
import { Inventario } from '../../../domain/models/inventario.model';
import { InventarioDocument, InventarioMongo } from '../../schemas/inventario.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InventarioRepositoryMongo implements InventarioRepository {
  constructor(
    @InjectModel(InventarioMongo.name) private readonly inventarioModel: Model<InventarioDocument>
  ) {}

  async findAll(): Promise<Inventario[]> {
    const docs = await this.inventarioModel.find().exec();
    return docs.map(doc => this.toDomain(doc));
  }

  async findByCodiceBarre(codice: string): Promise<Inventario | null> {
    const doc = await this.inventarioModel.findOne({ codice_barre: codice }).exec();
    return doc ? this.toDomain(doc) : null;
  }

  async getQuantitaTotale(): Promise<number> {
    const docs = await this.inventarioModel.find().exec();
    return docs.reduce((sum, item) => sum + item.quantita, 0);
  }

  private toDomain(doc: InventarioDocument): Inventario {
    return new Inventario(
      doc.codice_barre,
      doc.nome_prodotto,
      doc.prezzo_unitario,
      doc.quantita,
      doc.quantita_minima,
      doc.quantita_massima,
    );
  }
}
