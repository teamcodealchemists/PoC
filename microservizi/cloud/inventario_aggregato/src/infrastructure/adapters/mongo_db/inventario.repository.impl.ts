import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InventoryRepository } from '../../../domain/ports/inventario.repository';
import { Inventory } from '../../../domain/models/inventario.model';
import {
  InventoryDocument,
  CloudInventoryMongo,
} from '../../schemas/inventario.schema';
import { Injectable } from '@nestjs/common';
import { StockAddedDto } from 'src/events/Dtos/StockAddedDto';
import { StockRemovedDto } from 'src/events/Dtos/StockRemovedDto';
// import { CreaProdottoDto } from '../../../interfaces/http/dto/crea-prodotto.dto';

@Injectable()
export class InventoryRepositoryMongo implements InventoryRepository {
  constructor(
    @InjectModel(CloudInventoryMongo.name)
    private readonly inventoryModel: Model<InventoryDocument>,
  ) {}

  async findAll(): Promise<Inventory[]> {
    const docs = await this.inventoryModel.find().exec();
    return docs.map((doc) => this.toDomain(doc));
  }

  async findByBarCode(code: string): Promise<Inventory | null> {
    const result = await this.inventoryModel.findOne({ barCode: code }).exec();
    if (!result) return null;
    return {
      barCode: result.barCode,
      productName: result.productName,
      unitaryPrice: result.unitaryPrice,
      quantity: result.quantity,
      minQuantity: result.minQuantity,
      maxQuantity: result.maxQuantity,
    };
  }

  async stockAdded(stock: StockAddedDto): Promise<void> {}

  async stockRemoved(stock: StockRemovedDto): Promise<void> {}

  private toDomain(doc: InventoryDocument): Inventory {
    return new Inventory(
      doc.barCode,
      doc.productName,
      doc.unitaryPrice,
      doc.quantity,
      doc.minQuantity,
      doc.maxQuantity,
    );
  }
}
