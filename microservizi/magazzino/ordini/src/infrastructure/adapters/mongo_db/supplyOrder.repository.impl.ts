import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderRepository } from '../../../domain/ports/order.repository';
import { ConcreteSupplyOrder } from '../../../domain/core/concreteSupplyOrder';
import { SupplyOrderDocument, SupplyOrderMongo } from '../../schemas/supplyOrder.schema';
import { OrderState } from '../../../domain/core/orderState.enum';

@Injectable()
export class SupplyOrderRepositoryMongo implements OrderRepository {
  constructor(
    @InjectModel(SupplyOrderMongo.name, 'supply') 
    private readonly orderModel: Model<SupplyOrderDocument>
  ) {}

  async getOrder(orderId: number): Promise<ConcreteSupplyOrder | null> {
    const doc = await this.orderModel.findOne({ orderID: orderId }).exec();
    return doc ? this.toDomain(doc) : null;
  }

  async insertOrder(order: ConcreteSupplyOrder): Promise<ConcreteSupplyOrder> {
    const created = new this.orderModel(order);
    const saved = await created.save();
    return this.toDomain(saved);
  }

  async cancelOrder(orderId: number): Promise<boolean> {
    const order = await this.orderModel.findOne({ orderID: orderId }).exec();
    if (!order) return false;

    if (order.orderState === OrderState.PENDING || order.orderState === OrderState.PROCESSING) {
      order.orderState = OrderState.CANCELLED;
      await order.save();
      return true;
    }
    return false;
  }

  async setOrderState(orderId: number, newState: OrderState): Promise<boolean> {
    const result = await this.orderModel.updateOne(
      { orderID: orderId },
      { orderState: newState }
    );
    return result.modifiedCount > 0;
  }

  async getAllOrders(): Promise<ConcreteSupplyOrder[]> {
    const docs = await this.orderModel.find().exec();
    return docs.map(doc => this.toDomain(doc));
  }

  private toDomain(doc: SupplyOrderDocument): ConcreteSupplyOrder {
    return new ConcreteSupplyOrder(
      doc.orderID,
      doc.orderState,
      doc.creationDate,
      doc.timeToArrive,
      doc.idProduct,
      doc.quantity,
      doc.warehouseDestination,
      doc.externalAddress
    );
  }
}

