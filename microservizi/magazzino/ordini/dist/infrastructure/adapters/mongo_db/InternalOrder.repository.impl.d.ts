import { Model } from 'mongoose';
import { OrderRepository } from '../../../domain/ports/order.repository';
import { ConcreteInternalOrder } from '../../../domain/core/concreteInternalOrder';
import { InternalOrderDocument } from '../../schemas/internalOrder.schema';
import { OrderState } from '../../../domain/core/orderState.enum';
export declare class InternalOrderRepositoryMongo implements OrderRepository {
    private readonly orderModel;
    constructor(orderModel: Model<InternalOrderDocument>);
    getOrder(orderId: number): Promise<ConcreteInternalOrder | null>;
    insertOrder(order: ConcreteInternalOrder): Promise<ConcreteInternalOrder>;
    cancelOrder(orderId: number): Promise<boolean>;
    setOrderState(orderId: number, newState: OrderState): Promise<boolean>;
    getAllOrders(): Promise<ConcreteInternalOrder[]>;
    private toDomain;
}
