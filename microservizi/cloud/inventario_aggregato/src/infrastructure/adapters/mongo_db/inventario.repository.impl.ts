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
    const quantities = await this.productInWarehouseModel.aggregate([
      {
        $group: {
          _id: "$barCode",
          totalQuantity: { $sum: "$quantity" },
        },
      },
    ]);

    console.log('Quantità totali per barCode:', quantities);

    const quantityMap = new Map<string, number>();
    for (const item of quantities) {
      quantityMap.set(String(item._id), item.totalQuantity);
    }
    console.log('Mappa delle quantità:', quantityMap);

    const products = await this.productTableModel.find().exec();

    const inventory: Inventory[] = products.map(product => ({
      barCode: product.barCode,
      productName: product.productName,
      unitaryPrice: product.unitaryPrice,
      quantity: quantityMap.get(product.barCode) || 0,
    }));

    return inventory;
  }

  async syncAddStock(stock:StockAddedDto){
    //VERSIONE CON UPSERT AUTOMATICO. VANTAGGI: -Più efficiente, evita query multiple, atomico, Gestione automatica di inserimenti e aggiornamenti, thread safe.
    try {
    // 1. Upsert del prodotto nella tabella productTable
    await this.productTableModel.updateOne(
      { barCode: stock.barCode }, // Filtro
      {
        $setOnInsert: { // Solo se inserisce (non se aggiorna)
          barCode: stock.barCode,
          productName: stock.productName,
          unitaryPrice: stock.unitaryPrice,
        }
      },
      { upsert: true } // Crea se non esiste e salva automaticamente
    );

    console.log(`Prodotto ${stock.barCode} verificato/inserito in productTable`);

    //Inserisco il prodotto nella tabella productInWarehouse
    const result = await this.productInWarehouseModel.updateOne(
      {
        barCode: stock.barCode,         //ricerca per barcode
        warehouseId: stock.warehouseId  // ricerca per warehouseId
      },
      {
        $setOnInsert: {     // Solo se inserisce (non se aggiorna)
          barCode: stock.barCode,
          warehouseId: stock.warehouseId,
          quantity: stock.quantity,
          minQuantity: stock.minQuantity,
          maxQuantity: stock.maxQuantity,
        }
      },
      { upsert: true } // Crea se non esiste e salva automaticamente
    );
  
    if (result.upsertedCount > 0) {
      console.log(`Nuovo stock inserito per ${stock.barCode} in ${stock.warehouseId}`);
    }

    } catch (error) {
      console.error('Errore durante addStock:', error);
      throw error;
    }
  }


  async syncRemoveStock(stock: StockRemovedDto): Promise<void> {
    //VERSIONE ANALOGA ALLA FUNZIONE ADDSTOCK
    try {
      // 1. Rimuovi record se quantità è zero
      await this.productInWarehouseModel.deleteOne({
        barCode: stock.barCode,
        warehouseId: stock.warehouseId,
        quantity: { $lte: 0 }
      });

      // 2. Controlla se rimuovere il prodotto dalla productTable
      const remainingStock = await this.productInWarehouseModel
        .findOne({ barCode: stock.barCode })
        .exec();

      if (!remainingStock) {
        await this.productTableModel.deleteOne({ barCode: stock.barCode });
        console.log(`Prodotto ${stock.barCode} rimosso completamente (non presente in nessun magazzino)`);
      }

      console.log(`Stock rimosso con successo per ${stock.barCode} da ${stock.warehouseId}`);

    } catch (error) {
      console.error('Errore durante removeStock:', error);
      throw error;
    }
  }

  async syncEditStock(stock: StockAddedDto): Promise<void> {
    //VERSIONE CON UPSERT AUTOMATICO. VANTAGGI: -Più efficiente, evita query multiple, atomico, Gestione automatica di inserimenti e aggiornamenti
    try {
      // Modifica del prodotto in productInWarehouse
      await this.productInWarehouseModel.updateOne(
        {
          barCode: stock.barCode,
          warehouseId: stock.warehouseId
        },
        {
          $set: {
            quantity: stock.quantity,
            minQuantity: stock.minQuantity,
            maxQuantity: stock.maxQuantity,
          }
        },
        { upsert: true } // Crea se non esiste e salva automaticamente
      );

      console.log(`Stock modificato con successo per ${stock.barCode} in ${stock.warehouseId}`);

    } catch (error) {
      console.error('Errore durante editStock:', error);
      throw error;
    }
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
