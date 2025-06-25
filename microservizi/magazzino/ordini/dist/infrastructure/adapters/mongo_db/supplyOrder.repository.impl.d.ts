import { Model } from 'mongoose';
import { OrderRepository } from '../../../domain/ports/order.repository';
import { ConcreteSupplyOrder } from '../../../domain/core/concreteSupplyOrder';
import { SupplyOrderDocument } from '../../schemas/supplyOrder.schema';
import { OrderState } from '../../../domain/core/orderState.enum';
export declare class SupplyOrderRepositoryMongo implements OrderRepository {
    private readonly orderModel;
    constructor(orderModel: Model<SupplyOrderDocument>);
    getOrder(orderId: number): Promise<ConcreteSupplyOrder | null>;
    insertOrder(order: ConcreteSupplyOrder): Promise<ConcreteSupplyOrder>;
    cancelOrder(orderId: number): Promise<boolean>;
    setOrderState(orderId: number, newState: OrderState): Promise<boolean>;
    getAllOrders(): Promise<ConcreteSupplyOrder[]>;
    private toDomain;
}
