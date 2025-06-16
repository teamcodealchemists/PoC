import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InventarioRepository } from '../../../domain/ports/inventario.repository';
import { Inventario } from '../../../domain/models/inventario.model';
import { InventarioDocument, InventarioMongo } from '../../schemas/inventario.schema';
import { Injectable } from '@nestjs/common';
import { CreaProdottoDto } from '../../../interfaces/http/dto/crea-prodotto.dto';



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
  const result = await this.inventarioModel.findOne({ codice_barre: codice }).exec();
  if (!result) return null;
  return {
  codice_barre: result.codice_barre,
  nome_prodotto: result.nome_prodotto,
  prezzo_unitario: result.prezzo_unitario,
  quantita: result.quantita,
  quantita_minima: result.quantita_minima,
  quantita_massima: result.quantita_massima,
  };
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

 

  async aggiungiProdotto(prodotto: CreaProdottoDto): Promise<InventarioMongo> {
  const nuovo = new this.inventarioModel(prodotto);
  return nuovo.save();
}

async removeByCodiceBarre(codice: string): Promise<boolean> {
  const result = await this.inventarioModel.deleteOne({ codice_barre: codice });
  return result.deletedCount > 0;
}

async aggiornaQuantita(codice: string, nuovaQuantita: number): Promise<InventarioMongo | null> {
  const prodotto = await this.inventarioModel.findOne({ codice_barre: codice });

  if (!prodotto) {
    return null;
  }

  if (prodotto.quantita_massima !== undefined && nuovaQuantita > prodotto.quantita_massima) {
    throw new Error(
      `La nuova quantità (${nuovaQuantita}) supera la quantità massima (${prodotto.quantita_massima})`
    );
  }

   if (prodotto.quantita_massima !== undefined && nuovaQuantita < prodotto.quantita_minima) {
    throw new Error(
      `La nuova quantità (${nuovaQuantita}) è inferiore della quantità minima (${prodotto.quantita_minima})`
    );
  }

 
  return this.inventarioModel.findOneAndUpdate(
    { codice_barre: codice },
    { quantita: nuovaQuantita },
    { new: true }
  );
}

 async findProdottiARischio(): Promise<Inventario[]> {
  return this.inventarioModel.find({
    quantita_minima: { $exists: true },
    $expr: {
      $lte: [
        '$quantita',
        { $multiply: ['$quantita_minima', 1.2] }
      ]
    }
  })
  .lean() 
  .exec();
}

}
