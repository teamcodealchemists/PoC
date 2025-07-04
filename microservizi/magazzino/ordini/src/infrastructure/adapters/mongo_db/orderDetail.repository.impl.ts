import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDetailDocument, OrderDetailMongo } from '../../schemas/orderDetail.schema';

@Injectable()
export class OrderDetailRepositoryMongo {
  constructor(
    @InjectModel(OrderDetailMongo.name, 'orders')
    private readonly orderDetailModel: Model<OrderDetailDocument>
  ) {}

  async findByOrderId(orderID: number): Promise<OrderDetailMongo[]> {
    console.log(`Finding order details for orderID: ${orderID}`);
    return this.orderDetailModel.find({ orderID }).exec();
  }

  async insertMany(details: OrderDetailMongo[]): Promise<void> {
    await this.orderDetailModel.insertMany(details);
  }
}