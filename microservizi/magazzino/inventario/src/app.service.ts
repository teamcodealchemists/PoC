import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel('categorie') private readonly categorieModel: Model<any>,
    @InjectModel('inventario') private readonly inventarioModel: Model<any>,
  ) {}

  //getIdMagazzino(): string {
   // return this.configService.get('ID_MAGAZZINO');
  //}

  async getQuantitaProdottiAlimentari(): Promise<number> {
    const categoriaAlimentari = await this.categorieModel.findOne({ nome_categoria: 'Alimentari' }).exec();
    if (!categoriaAlimentari) {
      return 0;
    }
    const prodottiAlimentari = await this.inventarioModel.find({ id_categoria: categoriaAlimentari._id }).exec();
    return prodottiAlimentari.reduce((acc, prodotto) => acc + prodotto.quantita, 0);
  }
}
