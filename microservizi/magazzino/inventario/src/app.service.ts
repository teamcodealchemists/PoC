import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Categoria, CategoriaDocument } from './schemas/categoria.schema';
import { Inventario, InventarioDocument } from './schemas/inventario.schema';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
     @InjectModel(Categoria.name) private readonly categorieModel: Model<CategoriaDocument>,
    @InjectModel(Inventario.name) private readonly inventarioModel: Model<InventarioDocument>,
  ) {}

  //getIdMagazzino(): string {
   // return this.configService.get('ID_MAGAZZINO');
  //}

  async getQuantitaProdottiAlimentari(): Promise<number> {
   /* const categoriaAlimentari = await this.categorieModel.findOne({ nome_categoria: 'Alimentari' }).exec();
    if (!categoriaAlimentari) {
      return 0;
    }*/
    const prodottiAlimentari = await this.inventarioModel.find({ id_categoria: 3 }).exec();
    return prodottiAlimentari.reduce((acc, prodotto) => acc + prodotto.quantita, 0);
  }
}
