import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InventoryRepository } from '../../../domain/ports/inventario.repository';
import { Inventory } from '../../../domain/models/inventario.model';
// import {
//   InventoryDocument,
//   CloudInventoryMongo,
// } from '../../schemas/inventario.schema';
import { Injectable } from '@nestjs/common';

import { StockAddedDto } from 'src/events/Dtos/StockAddedDto';
import { StockRemovedDto } from 'src/events/Dtos/StockRemovedDto';
import { ProductTable } from 'src/infrastructure/schemas/productTable.schema';
import { ProductInWarehouse } from 'src/infrastructure/schemas/productInWarehouse.schema';

@Injectable()
export class InventoryRepositoryMongo implements InventoryRepository {
  constructor(
    @InjectModel(ProductTable.name)
    private readonly productTableModel: Model<ProductTable>,

    @InjectModel(ProductInWarehouse.name)
    private readonly productInWarehouseModel: Model<ProductInWarehouse>,
  ) {}

  async findAll(): Promise<Inventory[]> {
    const results_product = await this.productTableModel.find().exec();
    const results_warehouse = await this.productInWarehouseModel.find().exec();
    console.log('Results from product table:');
    console.log(results_product);
    console.log(results_warehouse);

    results_product.map((doc) => ({
      barCode: doc.barCode,
      productName: doc.productName,
      unitaryPrice: doc.unitaryPrice,
    }));

    return new Promise((resolve) => {
      const inventory: Inventory[] = [];
      results_product.forEach((product) => {
        const warehouse = results_warehouse.find(
          (wh) => wh.barCode === product.barCode,
        );
        if (warehouse) {
          inventory.push({
            barCode: product.barCode,
            productName: product.productName,
            unitaryPrice: product.unitaryPrice,
            quantity: warehouse.quantity,
            minQuantity: warehouse.minQuantity,
            maxQuantity: warehouse.maxQuantity,
          });
        } else {
          inventory.push({
            barCode: product.barCode,
            productName: product.productName,
            unitaryPrice: product.unitaryPrice,
            quantity: 0, // Default value if not found in warehouse
            minQuantity: 0, // Default value if not found in warehouse
            maxQuantity: 0, // Default value if not found in warehouse
          });
        }
      });
      resolve(inventory);
    });

    // results_warehouse.map((doc) => ({
    //   barCode: doc.barCode,
    //   quantity: doc.quantity,
    //   minQuantity: doc.minQuantity,
    //   maxQuantity: doc.maxQuantity,
    // }));
    // const inventory: Inventory[] = [];
    // results_product.forEach((product) => {
    //   const warehouse = results_warehouse.find(
    //     (wh) => wh.barCode === product.barCode,
    //   );
    //   if (warehouse) {
    //     inventory.push({
    //       barCode: product.barCode,
    //       productName: product.productName,
    //       unitaryPrice: product.unitaryPrice,
    //       quantity: warehouse.quantity,
    //       minQuantity: warehouse.minQuantity,
    //       maxQuantity: warehouse.maxQuantity,
    //     });
    //   } else {
    //     inventory.push({
    //       barCode: product.barCode,
    //       productName: product.productName,
    //       unitaryPrice: product.unitaryPrice,
    //       quantity: 0, // Default value if not found in warehouse
    //       minQuantity: 0, // Default value if not found in warehouse
    //       maxQuantity: 0, // Default value if not found in warehouse
    //     });
    //   }
    // }
    // );
    // return inventory;
  }

  async findByBarCode(code: string): Promise<Inventory | null> {
    // const result = await this.inventoryModel.findOne({ barCode: code }).exec();
    // if (!result) return null;
    // return {
    //   barCode: result.barCode,
    //   productName: result.productName,
    //   unitaryPrice: result.unitaryPrice,
    //   quantity: result.quantity,
    //   minQuantity: result.minQuantity,
    //   maxQuantity: result.maxQuantity,
    // };
    return null;
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
      //.findByIdAndDelete(stock.id)
      //.exec();
  }

//   private toDomain(doc: InventoryDocument): Inventory {
//     return new Inventory(
//       doc.barCode,
//       doc.productName,
//       doc.unitaryPrice,
//       doc.quantity,
//       doc.minQuantity,
//       doc.maxQuantity,
//     );
//   }
}
