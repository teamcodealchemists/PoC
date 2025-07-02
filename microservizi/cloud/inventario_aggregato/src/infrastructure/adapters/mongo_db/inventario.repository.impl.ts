import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InventoryRepository } from '../../../domain/ports/inventario.repository';
import { Inventory } from '../../../domain/models/inventario.model';

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

async findAll(): Promise<Inventory[]> {     //TODO: da capire se è necessario: una visualizzazione di tutto serve?
    const results_product = await this.productTableModel.find().exec();
    const results_warehouse = await this.productInWarehouseModel.find().exec();

    results_product.map((doc) => ({
      barCode: doc.barCode,
      productName: doc.productName,
      unitaryPrice: doc.unitaryPrice,
    }));

    results_warehouse.map((doc) => ({
      warehouseId: doc.warehouseId,
      barCode: doc.barCode,
      quantity: doc.quantity,
      minQuantity: doc.minQuantity,
      maxQuantity: doc.maxQuantity,
    }));
    const inventory: Inventory[] = [];
    results_product.forEach((product) => {
      for (let i=0; i < results_warehouse.length; i++) {

        if (results_warehouse[i].barCode == product.barCode) {
          const warehouse = results_warehouse[i];
          inventory.push({
            barCode: product.barCode,
            warehouseId: warehouse.warehouseId, // Aggiunto per includere l'ID del magazzino
            productName: product.productName,
            unitaryPrice: product.unitaryPrice,
            quantity: warehouse.quantity,
            minQuantity: warehouse.minQuantity,
            maxQuantity: warehouse.maxQuantity,
          });
        }
      }
    });
    return inventory;
  }

  async findAllProduct(): Promise<Inventory[]> {
    // Ottieni tutti i prodotti dalla tabella prodotti
    const results_product = await this.productTableModel.find().exec();
    
    if (!results_product || results_product.length === 0) return [];

    const inventory: Inventory[] = [];

    // Per ogni prodotto, calcola la quantità totale in tutti i magazzini
    for (const product of results_product) {
      
      const totals = await this.productInWarehouseModel.aggregate([
        { $match: { barCode: product.barCode } },
        { 
          $group: { 
            _id: null, 
            totalQuantity: { $sum: "$quantity" }
          } 
        },
        // Proiezione per selezionare solo campi specifici
        { 
          $project: {
            _id: 0,
            totalQuantity: 1
          }
        }
      ]);

      console.log(`Totali per il prodotto ${product.barCode}:`, totals);

      const aggregatedData = totals.length > 0 ? totals[0] : { totalQuantity: 0 };

      inventory.push({
        barCode: product.barCode,
        productName: product.productName,
        unitaryPrice: product.unitaryPrice,
        quantity: aggregatedData.totalQuantity,
      });
    }
    console.log('Inventory:', inventory);

    return inventory;
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

    await newStockInWarehouse.save();
    await newStock.save();
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
