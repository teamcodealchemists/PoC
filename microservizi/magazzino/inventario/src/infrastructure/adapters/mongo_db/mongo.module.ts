import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { InventoryMongo, InventorySchema } from '../../../infrastructure/schemas/inventory.schema';
import { InventoryRepositoryMongo } from './inventory.repository.impl';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://mongo:27017/inventory'),
        MongooseModule.forFeature([
            { name: InventoryMongo.name, schema: InventorySchema },
        ])
    ],
    providers: [
        { provide: 'InventoryRepository', useClass: InventoryRepositoryMongo }
    ],
    exports: [
        { provide: 'InventoryRepository', useClass: InventoryRepositoryMongo }
    ]
})
export class MongoModule { }