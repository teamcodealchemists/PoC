import { InventoryRepositoryMongo } from 'src/infrastructure/adapters/mongo_db/inventory.repository.impl';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ConcreteProduct } from "src/domain/core/concreteProduct";
import { AddProductDto } from "src/interfaces/http/dto/addProduct.dto";
import { IdDto } from "src/interfaces/http/dto/id.dto";
import { EditProductDto } from "src/interfaces/http/dto/editProduct.dto";


@Injectable()
export class InventoryHandlerService {
  constructor(
    @Inject('InventoryRepository')
    private readonly inventoryRepository: InventoryRepositoryMongo
  ) {}

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
    const res = await this.inventoryRepository.removeById(id.id);
    if (!res) {
      throw new Error('Product not found');
    }
    else {
      return;
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
  }

  async getTotal(): Promise<number> {
    const products = await this.inventoryRepository.findAll();
    return products.reduce((total, product) => total + product.getQuantity(), 0);
  }


}
