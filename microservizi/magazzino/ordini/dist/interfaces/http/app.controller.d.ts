import { OrderState } from '../../domain/core/orderState.enum';
import { SupplyOrderRepositoryMongo } from '../../infrastructure/adapters/mongo_db/supplyOrder.repository.impl';
import { InternalOrderRepositoryMongo } from '../../infrastructure/adapters/mongo_db/internalOrder.repository.impl';
import { ExternalOrderRepositoryMongo } from '../../infrastructure/adapters/mongo_db/externalOrder.repository.impl';
import { ConcreteSupplyOrder } from '../../domain/core/concreteSupplyOrder';
import { ConcreteInternalOrder } from '../../domain/core/concreteInternalOrder';
import { ConcreteExternalOrder } from '../../domain/core/concreteExternalOrder';
export declare class OrderController {
    private readonly supplyOrderRepo;
    private readonly internalOrderRepo;
    private readonly externalOrderRepo;
    constructor(supplyOrderRepo: SupplyOrderRepositoryMongo, internalOrderRepo: InternalOrderRepositoryMongo, externalOrderRepo: ExternalOrderRepositoryMongo);
    getAllSupplyOrders(): Promise<ConcreteSupplyOrder[]>;
    getAllInternalOrders(): Promise<ConcreteInternalOrder[]>;
    getAllExternalOrders(): Promise<ConcreteExternalOrder[]>;
    getSupplyOrder(id: string): Promise<ConcreteSupplyOrder | null>;
    getInternalOrder(id: string): Promise<ConcreteInternalOrder | null>;
    getExternalOrder(id: string): Promise<ConcreteExternalOrder | null>;
    insertSupplyOrder(order: ConcreteSupplyOrder): Promise<ConcreteSupplyOrder>;
    insertInternalOrder(order: ConcreteInternalOrder): Promise<ConcreteInternalOrder>;
    insertExternalOrder(order: ConcreteExternalOrder): Promise<ConcreteExternalOrder>;
    cancelSupplyOrder(id: string): Promise<boolean>;
    cancelInternalOrder(id: string): Promise<boolean>;
    cancelExternalOrder(id: string): Promise<boolean>;
    setSupplyOrderState(id: string, body: {
        newState: OrderState;
    }): Promise<boolean>;
    setInternalOrderState(id: string, body: {
        newState: OrderState;
    }): Promise<boolean>;
    setExternalOrderState(id: string, body: {
        newState: OrderState;
    }): Promise<boolean>;
}
