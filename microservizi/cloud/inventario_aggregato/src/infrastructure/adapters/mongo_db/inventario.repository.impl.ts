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
import { ProductTable } from 'src/infrastructure/schemas/productTable.schema';
import { ProductInWarehouse } from 'src/infrastructure/schemas/productInWarehouse.schema';

@Injectable()
export class InventoryRepositoryMongo implements InventoryRepository {
  constructor(
    @InjectModel(CloudInventoryMongo.name)
    private readonly inventoryModel: Model<InventoryDocument>,

    @InjectModel(ProductTable.name)
    private readonly productTableModel: Model<ProductTable>,

    @InjectModel(ProductInWarehouse.name)
    private readonly productInWarehouseModel: Model<ProductInWarehouse>,
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

  async stockAdded(stock: StockAddedDto) {
    const newStock = new this.productTableModel({
      barCode: stock.barCode,
      productName: stock.productName,
      unitaryPrice: stock.unitaryPrice,
    });

    const newStockInWarehouse = new this.productInWarehouseModel({
      warehouseId: stock.warehouseId,
      barCode: stock.barCode,
      quantity: stock.quantity,
      minQuantity: stock.minQuantity,
      maxQuantity: stock.maxQuantity,
    });

    newStockInWarehouse.save();
    newStock.save();
  }

  async stockRemoved(stock: StockRemovedDto): Promise<void> {
    // stock.id dovrebbe essere un composito tra warehouse id e barcode id
    const user = await this.productInWarehouseModel
      .findByIdAndDelete(stock.id)
      .exec();
  }

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
