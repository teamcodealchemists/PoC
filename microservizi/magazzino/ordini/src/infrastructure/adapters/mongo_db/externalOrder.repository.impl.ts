import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderRepository } from '../../../domain/ports/order.repository';
import { ConcreteExternalOrder } from '../../../domain/core/concreteExternalOrder';
import { ExternalOrderDocument, ExternalOrderMongo } from '../../schemas/externalOrder.schema';
import { OrderState } from '../../../domain/core/orderState.enum';

@Injectable()
export class ExternalOrderRepositoryMongo implements OrderRepository {
  constructor(
    @InjectModel(ExternalOrderMongo.name, 'orders')
    private readonly orderModel: Model<ExternalOrderDocument>
  ) {}

  async getOrder(orderId: number): Promise<ConcreteExternalOrder | null> {
    const doc = await this.orderModel.findOne({ orderID: orderId }).exec();
    return doc ? this.toDomain(doc) : null;
  }

  async insertOrder(order: ConcreteExternalOrder): Promise<ConcreteExternalOrder> {
    const created = new this.orderModel(order);
    const saved = await created.save();
    return this.toDomain(saved);
  }

  async cancelOrder(orderId: number): Promise<boolean> {
    const order = await this.orderModel.findOne({ orderID: orderId }).exec();
    if (!order) return false;

    order.orderState = OrderState.CANCELLED;
    await order.save();
    return true;
  }

  async setOrderState(orderId: number, newState: OrderState): Promise<boolean> {
    const result = await this.orderModel.updateOne(
      { orderID: orderId },
      { orderState: newState }
    );
    return result.modifiedCount > 0;
  }

  async getAllOrders(): Promise<ConcreteExternalOrder[]> {
    const docs = await this.orderModel.find().exec();
    return docs.map(doc => this.toDomain(doc));
  }
  
  private toDomain(doc: ExternalOrderDocument): ConcreteExternalOrder {
    return new ConcreteExternalOrder(
      doc.orderID,
      doc.orderState,
      doc.creationDate,
      doc.timeToArrive,
      doc.warehouseDeparture,
      doc.externalAddress
    );
  }
}
