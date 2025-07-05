import { Inject, Injectable } from '@nestjs/common';
import { CheckProductDto } from '../interfaces/http/dto/checkProduct.dto'; // Update the path as needed
import { InventoryRepositoryMongo } from 'src/infrastructure/adapters/mongo_db/inventory.repository.impl';

@Injectable()
export class SagaMessagesService {
    constructor(
        @Inject('InventoryRepository') private readonly inventoryRepository: InventoryRepositoryMongo
    ) {}

    async checkInventory(data: CheckProductDto[]): Promise<{ success: boolean }> {
        // Implement the logic to check inventory
        for (const product of data) {
            const existingProduct = await this.inventoryRepository.findById(product.id);
            if (!existingProduct || existingProduct.getQuantity() < product.quantity) {
                return { success: false };
            }
        }
        // If all products are available in sufficient quantity
        for (const product of data) {
            const existingProduct = await this.inventoryRepository.findById(product.id);
            if (existingProduct) {
                existingProduct.removeQuantity(product.quantity);
                await this.inventoryRepository.updateProduct(existingProduct.getId(), existingProduct);
            }
        }
        return { success: true };
    }
}
