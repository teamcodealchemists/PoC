import { InventoryRepositoryMongo } from 'src/infrastructure/adapters/mongo_db/inventory.repository.impl';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ConcreteProduct } from "src/domain/core/concreteProduct";
import { AddProductDto } from "src/interfaces/http/dto/addProduct.dto";
import { IdDto } from "src/interfaces/http/dto/id.dto";
import { EditProductDto } from "src/interfaces/http/dto/editProduct.dto";
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class InventoryHandlerService {
  constructor(
    @Inject('InventoryRepository') private readonly inventoryRepository: InventoryRepositoryMongo,
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy
  ) { }

  async addProduct(dto: AddProductDto): Promise<void> {
    const product = await this.inventoryRepository.findById(dto.id);

    if (product) {
      throw new Error('Product already exists');
    }

    const newProduct = new ConcreteProduct(
      dto.id,
      dto.name,
      dto.unitPrice,
      dto.quantity !== undefined || null || "" ? dto.quantity : 0,
      dto.minQuantity !== undefined || null || "" ? dto.minQuantity : 0,
      dto.maxQuantity !== undefined || null || "" ? dto.maxQuantity : 0
    );

    await this.inventoryRepository.addProduct(newProduct);

    //Evento strutturato per il cloud
    const syncEvent = {
      barCode: newProduct.getId().toString(),
      productName: newProduct.getName(),
      unitaryPrice: newProduct.getUnitPrice(),
      warehouseId: String(process.env.WAREHOUSE_ID || 'LOCAL_WAREHOUSE'),
      quantity: newProduct.getQuantity(),
      minQuantity: newProduct.getMinQuantity(),
      maxQuantity: newProduct.getMaxQuantity(),
      eventType: 'STOCK_ADDED',
      timestamp: new Date().toISOString(),
      source: process.env.WAREHOUSE_ID || 'LOCAL_WAREHOUSE'
    };

    console.log('📤 Evento stockAdded:', {
      barCode: syncEvent.barCode,
      barCodeType: typeof syncEvent.barCode,
      warehouseId: syncEvent.warehouseId,
      warehouseIdType: typeof syncEvent.warehouseId
    });

    try {
      this.natsClient.emit('stockAdded', syncEvent);
      console.log(`✅ Evento stockAdded inviato per prodotto ${dto.id}`);
    } catch (error) {
      console.error(`❌ Errore durante l'invio dell'evento stockAdded:`, error);
      throw new Error('Failed to emit stockAdded event');
    }
  }

  async findProductById(id: IdDto): Promise<ConcreteProduct | null> {
    const product = await this.inventoryRepository.findById(id.id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id.id} not found`);
    }

    return this.inventoryRepository.findById(id.id);
  }

  async getInventory(): Promise<ConcreteProduct[]> {
    return this.inventoryRepository.findAll();
  }

  async removeProduct(id: IdDto): Promise<void> {
    // Prima trova il prodotto per verificare la quantità
    const product = await this.inventoryRepository.findById(id.id);

    if (!product) {
      throw new Error('Product not found');
    }

    // Verifica che la quantità sia zero
    if (product.getQuantity() > 0) {
      console.log(`❌ Cannot remove product: current quantity is ${product.getQuantity()}. Quantity must be 0 to remove the product.`);
      throw new Error(`Cannot remove product: current quantity is ${product.getQuantity()}. Quantity must be 0 to remove the product.`);
    }

    // Se la quantità è zero, procedi con la rimozione
    const res = await this.inventoryRepository.removeById(id.id);

    if (!res) {
      throw new Error('Failed to remove product from repository');
    }

    // Invia evento strutturato al cloud
    const syncEvent = {
      barCode: product.getId().toString(),
      warehouseId: String(process.env.WAREHOUSE_ID || 'LOCAL_WAREHOUSE'),
      eventType: 'STOCK_REMOVED',
      timestamp: new Date().toISOString(),
      source: process.env.WAREHOUSE_ID || 'LOCAL_WAREHOUSE'
    };

    console.log('📤 Evento stockRemoved:', {
      barCode: syncEvent.barCode,
      barCodeType: typeof syncEvent.barCode,
      warehouseId: syncEvent.warehouseId,
      warehouseIdType: typeof syncEvent.warehouseId,
      previousQuantity: product.getQuantity()
    });

    try {
      this.natsClient.emit('stockRemoved', syncEvent);
      console.log(`✅ Evento stockRemoved inviato per prodotto ${id.id} (quantità era ${product.getQuantity()})`);
    } catch (error) {
      console.error(`❌ Errore durante l'invio dell'evento stockRemoved:`, error);
      throw new Error('Failed to emit stockRemoved event');
    }
  }

  async editProduct(reqBody: EditProductDto): Promise<void> {
    const product = await this.inventoryRepository.findById(reqBody.id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const updatedProduct = new ConcreteProduct(
      reqBody.id,
      product.getName(),
      product.getUnitPrice(),
      reqBody.quantity !== undefined || null || "" ? reqBody.quantity : product.getQuantity(),
      reqBody.minQuantity !== undefined || null || "" ? reqBody.minQuantity : product.getMinQuantity(),
      reqBody.maxQuantity !== undefined || null || "" ? reqBody.maxQuantity : product.getMaxQuantity()
    );

    await this.inventoryRepository.updateProduct(reqBody.id, updatedProduct);

    // Modifica l'evento per essere compatibile con il cloud
    const syncEvent = {
      barCode: updatedProduct.getId().toString(), // Solo l'ID come stringa
      productName: updatedProduct.getName(),
      unitaryPrice: updatedProduct.getUnitPrice(),
      warehouseId: String(process.env.WAREHOUSE_ID || 'LOCAL_WAREHOUSE'),
      quantity: updatedProduct.getQuantity(),
      minQuantity: updatedProduct.getMinQuantity(),
      maxQuantity: updatedProduct.getMaxQuantity(),
      eventType: 'STOCK_EDITED',
      timestamp: new Date().toISOString(),
      source: process.env.WAREHOUSE_ID || 'LOCAL_WAREHOUSE'
    };
    console.log('type di barCode:', syncEvent.barCode, typeof syncEvent.barCode);
    console.log('type di warehouseId:', syncEvent.warehouseId, typeof syncEvent.warehouseId);
    try {
      this.natsClient.emit('stockEdited', syncEvent);

      console.log(`📤 Evento stockEdited inviato per prodotto ${reqBody.id}`);
    } catch (error) {
      console.error(`❌ Errore durante l'invio dell'evento stockEdited:`, error);
      throw new Error('Failed to emit stockEdited event');
    }
  }

  async getTotal(): Promise<number> {
    const products = await this.inventoryRepository.findAll();
    return products.reduce((total, product) => total + product.getQuantity(), 0);
  }


}
