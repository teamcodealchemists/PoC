import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InventoryRepository } from '../../../domain/ports/inventory.repository';
import { ConcreteProduct } from '../../../domain/core/concreteProduct';
import { InventoryDocument, InventoryMongo } from '../../schemas/inventory.schema';
import { Injectable } from '@nestjs/common';



@Injectable()
export class InventoryRepositoryMongo implements InventoryRepository {
  constructor(
    @InjectModel(InventoryMongo.name) private readonly inventoryModel: Model<InventoryDocument>
  ) { }

  async findAll(): Promise<ConcreteProduct[]> {
    const docs = await this.inventoryModel.find().exec();
    return docs.map(doc => this.toDomain(doc));
  }

  async findById(id: number): Promise<ConcreteProduct | null> {
    const result = await this.inventoryModel.findOne({ id: id }).exec();
    if (!result) {
      return null;
    }
    return (new ConcreteProduct(
      result.id,
      result.name,
      result.unitPrice,
      result.quantity,
      result.minQuantity,
      result.maxQuantity
    ));
  }

  //TODO: Vedere se è utile
  async getTotalQuantity(): Promise<number> {
    const docs = await this.inventoryModel.find().exec();
    return docs.reduce((sum, item) => sum + item.quantity, 0);
  }

  async addProduct(product: ConcreteProduct): Promise<InventoryMongo> {
    const newProduct = new this.inventoryModel(product);
    return newProduct.save();
  }

  async removeById(id: number): Promise<boolean> {
    const result = await this.inventoryModel.deleteOne({ id: id });
    return result.deletedCount > 0;
  }

  async updateProduct(id: number, updatedProduct: ConcreteProduct): Promise<InventoryMongo | null> {
    const product = await this.inventoryModel.findOne({ id: id });

    if (!product) {
      return null;
    }

    return this.inventoryModel.findOneAndUpdate(
      { id: id },
      { quantity: updatedProduct.getQuantity(),
        minQuantity: updatedProduct.getMinQuantity(),
        maxQuantity: updatedProduct.getMaxQuantity()},
      { new: true }
    );
  }

  //Metodi Privati 

  private toDomain(doc: InventoryDocument): ConcreteProduct {
    return (new ConcreteProduct(
      doc.id,
      doc.name,
      doc.unitPrice,
      doc.quantity,
      doc.minQuantity,
      doc.maxQuantity,
    ));
  }

}
