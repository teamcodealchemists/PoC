import { Module, OnApplicationBootstrap, Injectable, Inject } from '@nestjs/common';
import { MongoModule } from 'src/infrastructure/adapters/mongo_db/mongo.module';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { InventoryRepositoryMongo } from 'src/infrastructure/adapters/mongo_db/inventory.repository.impl';
import { ClientProxy } from '@nestjs/microservices';

@Module({
    imports: [
        MongoModule,
        NatsClientModule
    ],
    controllers: [],
    providers: [],
})
export class BootstrapModule implements OnApplicationBootstrap {
    constructor(
        @Inject('InventoryRepository') private readonly inventoryRepository: InventoryRepositoryMongo,
        @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy
    ) { }
    onApplicationBootstrap() {
        console.log('Application has been bootstrapped');
        this.initializeSync();
    }

    private async initializeSync() {

        const products = await this.inventoryRepository.findAll();
        for (const newProduct of products) {
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

            try {
                this.natsClient.emit('stockAdded', syncEvent);
                console.log(`✅ Evento stockAdded inviato per prodotto ${newProduct.getId()}`);
            } catch (error) {
                console.error(`❌ Errore durante l'invio dell'evento stockAdded:`, error);
                throw new Error('Failed to emit stockAdded event');
            }
        }
    }
}