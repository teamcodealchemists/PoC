//import { InventoryRepository } from ...
import { Injectable } from '@nestjs/common';
import { ConcreteProduct } from "src/domain/core/concreteProduct";
import { AddProductDto } from "src/interface/dto/addProduct.dto";


@Injectable()
export class InventoryHandlerCommand {
  constructor(
    // private readonly inventoryRepository: InventoryRepository
  ) {}

  //- UC 9: Aggiunta nuova tipologia di merce
  async addProduct(dto: AddProductDto): Promise<void> {
    //const product = await this inventoryRepository.findById(dto.id);
    if (false) {
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

    console.log('New product created:', newProduct);

    //await this.inventoryRepository.save(newProduct);
  }


}
