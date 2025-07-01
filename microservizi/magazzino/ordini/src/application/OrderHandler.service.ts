import { Injectable } from '@nestjs/common';

import { InternalOrderRepositoryMongo } from '../infrastructure/adapters/mongo_db/internalOrder.repository.impl';
import { ExternalOrderRepositoryMongo } from '../infrastructure/adapters/mongo_db/externalOrder.repository.impl';
import { OrderDetailRepositoryMongo } from '../infrastructure/adapters/mongo_db/orderDetail.repository.impl';

import { AddInternalOrderDto } from '../interfaces/http/dto/addInternalOrder.dto';
import { AddExternalOrderDto } from '../interfaces/http/dto/addExternalOrder.dto';

import { ConcreteInternalOrder } from '../domain/core/concreteInternalOrder';
import { ConcreteExternalOrder } from '../domain/core/concreteExternalOrder';

import { OrderState } from '../domain/core/orderState.enum';

@Injectable()
export class OrderHandlerService {
  constructor(
    private readonly internalOrderRepo: InternalOrderRepositoryMongo,
    private readonly externalOrderRepo: ExternalOrderRepositoryMongo,
    private readonly orderDetailRepo: OrderDetailRepositoryMongo,
  ) {}

  async getAllInternalOrders() {
    return this.internalOrderRepo.getAllOrders();
  }

  async getAllExternalOrders() {
    return this.externalOrderRepo.getAllOrders();
  }

  async getInternalOrder(id: number) {
    return this.internalOrderRepo.getOrder(id);
  }

  async getExternalOrder(id: number) {
    return this.externalOrderRepo.getOrder(id);
  }

  async getOrderDetails(orderID: number) {
    return this.orderDetailRepo.findByOrderId(orderID);
  }

async insertInternalOrder(order: AddInternalOrderDto) {
  // Salva i dettagli prodotti in orderDetails
  if (order.orderDetails && order.orderDetails.length > 0) {
    const details = order.orderDetails.map((d) => ({
      orderID: order.orderID,
      idProduct: d.idProduct,
      nameProduct: d.nameProduct,
      quantity: d.quantity,
      unitaryPrice: d.unitaryPrice,
    }));
    await this.orderDetailRepo.insertMany(details);
  }
  // Salva l'ordine in internalOrders
  const concreteOrder = new ConcreteInternalOrder(
    order.orderID,
    order.orderState,
    order.creationDate,
    order.timeToArrive,
    order.warehouseDestination,
    order.warehouseDeparture
  );
  return this.internalOrderRepo.insertOrder(concreteOrder);
}

  async insertExternalOrder(order: AddExternalOrderDto) {
    // Salva i dettagli prodotti in orderDetails
    if (order.orderDetails && order.orderDetails.length > 0) {
      const details = order.orderDetails.map((d) => ({
        orderID: order.orderID,
        idProduct: d.idProduct,
        nameProduct: d.nameProduct,
        quantity: d.quantity,
        unitaryPrice: d.unitaryPrice,
      }));
      await this.orderDetailRepo.insertMany(details);
    }
    // Salva l'ordine in externalOrders
    const concreteOrder = new ConcreteExternalOrder(
      order.orderID,
      order.orderState,
      order.creationDate,
      order.timeToArrive,
      order.warehouseDeparture,
      order.externalAddress
    );
    return this.externalOrderRepo.insertOrder(concreteOrder);
  }

  async cancelInternalOrder(id: number) {
    return this.internalOrderRepo.cancelOrder(id);
  }

  async cancelExternalOrder(id: number) {
    return this.externalOrderRepo.cancelOrder(id);
  }

  async setInternalOrderState(id: number, newState: OrderState) {
    return this.internalOrderRepo.setOrderState(id, newState);
  }

  async setExternalOrderState(id: number, newState: OrderState) {
    return this.externalOrderRepo.setOrderState(id, newState);
  }
}