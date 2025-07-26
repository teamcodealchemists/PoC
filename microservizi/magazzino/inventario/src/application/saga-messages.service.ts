import { ConcreteProduct } from 'src/domain/core/concreteProduct';
import { CheckProductDto } from '../interfaces/nats/dto/checkProduct.dto';
import { Inject, Injectable } from '@nestjs/common';
import { InventoryRepositoryMongo } from 'src/infrastructure/adapters/mongo_db/inventory.repository.impl';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class SagaMessagesService {
    constructor(
        @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
        @Inject('InventoryRepository') private readonly inventoryRepository: InventoryRepositoryMongo
    ) { }

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
                this.editEvent(existingProduct);
                await this.inventoryRepository.updateProduct(existingProduct.getId(), existingProduct);
            }
        }
        return { success: true };
    }

    async refundInventory(data: CheckProductDto[]): Promise<{ success: boolean }> {
        // Implement the logic to refund inventory
        for (const product of data) {
            const existingProduct = await this.inventoryRepository.findById(product.id);
            if (existingProduct) {
                existingProduct.addQuantity(product.quantity);
                this.editEvent(existingProduct);
                await this.inventoryRepository.updateProduct(existingProduct.getId(), existingProduct);
            } else {
                return { success: false };
            }
        }
        return { success: true };
    }

    private async editEvent(updatedProduct: ConcreteProduct) {
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


        try {
            this.natsClient.emit('stockEdited', syncEvent);
        } catch (error) {
            throw new Error('Failed to emit stockEdited event');
        }
    }
}
