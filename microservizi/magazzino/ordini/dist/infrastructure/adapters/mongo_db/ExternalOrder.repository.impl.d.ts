import { Model } from 'mongoose';
import { OrderRepository } from '../../../domain/ports/order.repository';
import { ConcreteExternalOrder } from '../../../domain/core/concreteExternalOrder';
import { ExternalOrderDocument } from '../../schemas/externalOrder.schema';
import { OrderState } from '../../../domain/core/orderState.enum';
export declare class ExternalOrderRepositoryMongo implements OrderRepository {
    private readonly orderModel;
    constructor(orderModel: Model<ExternalOrderDocument>);
    getOrder(orderId: number): Promise<ConcreteExternalOrder | null>;
    insertOrder(order: ConcreteExternalOrder): Promise<ConcreteExternalOrder>;
    cancelOrder(orderId: number): Promise<boolean>;
    setOrderState(orderId: number, newState: OrderState): Promise<boolean>;
    getAllOrders(): Promise<ConcreteExternalOrder[]>;
    private toDomain;
}
