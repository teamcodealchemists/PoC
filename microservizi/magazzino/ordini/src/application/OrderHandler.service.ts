import { lastValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { InternalOrderRepositoryMongo } from '../infrastructure/adapters/mongo_db/internalOrder.repository.impl';
import { ExternalOrderRepositoryMongo } from '../infrastructure/adapters/mongo_db/externalOrder.repository.impl';
import { OrderDetailRepositoryMongo } from '../infrastructure/adapters/mongo_db/orderDetail.repository.impl';

import { AddInternalOrderDto } from '../interfaces/http/dto/addInternalOrder.dto';
import { AddExternalOrderDto } from '../interfaces/http/dto/addExternalOrder.dto';
import { IdDto } from '../interfaces/http/dto/id.dto';
import { OrderStateDto } from '../interfaces/http/dto/orderState.dto';

import { ConcreteInternalOrder } from '../domain/core/concreteInternalOrder';
import { ConcreteExternalOrder } from '../domain/core/concreteExternalOrder';
import { OrderState } from '../domain/core/orderState.enum';

@Injectable()
export class OrderHandlerService {
  constructor(
    private readonly internalOrderRepo: InternalOrderRepositoryMongo,
    private readonly externalOrderRepo: ExternalOrderRepositoryMongo,
    private readonly orderDetailRepo: OrderDetailRepositoryMongo,
    @Inject('natsService') private natsClient: ClientProxy,
  ) {}

  async getAllInternalOrders() {
    return this.internalOrderRepo.getAllOrders();
  }

  async getAllExternalOrders() {
    return this.externalOrderRepo.getAllOrders();
  }

  async getInternalOrder(idDto: IdDto) {
    return this.internalOrderRepo.getOrder(idDto.id);
  }

  async getExternalOrder(idDto: IdDto) {
    return this.externalOrderRepo.getOrder(idDto.id);
  }

  async getOrderDetails(idDto: IdDto) {
    return this.orderDetailRepo.findByOrderId(idDto.id);
  }

  async insertInternalOrder(order: AddInternalOrderDto) {
    this.validateOrderFields(order, [
      'orderID',
      'orderState',
      'creationDate',
      'timeToArrive',
      'warehouseDestination',
      'warehouseDeparture',
    ]);

    this.validateOrderDetails(order.orderDetails);

    const existingOrder = await this.internalOrderRepo.getOrder(order.orderID);
    if (existingOrder) {
      throw new Error(`Internal order with ID ${order.orderID} already exists`);
    }

    const inventoryOk = await this.checkInventoryForOrder(order.orderDetails);
    console.log('Inventory check result IN FUN:', !inventoryOk);
    if (!inventoryOk) {
      throw new Error('Materials not available in inventory');
    }

    await this.saveOrderDetails(order.orderID, order.orderDetails);

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
    this.validateOrderFields(order, [
      'orderID',
      'orderState',
      'creationDate',
      'timeToArrive',
      'warehouseDeparture',
      'externalAddress',
    ]);

    this.validateOrderDetails(order.orderDetails);

    const existingOrder = await this.externalOrderRepo.getOrder(order.orderID);
    if (existingOrder) {
      throw new Error(`External order with ID ${order.orderID} already exists`);
    }

    const inventoryOk = await this.checkInventoryForOrder(order.orderDetails);
    if (!inventoryOk) {
      throw new Error('Materials not available in inventory');
    }

    await this.saveOrderDetails(order.orderID, order.orderDetails);

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

  async setInternalOrderState(idDto: IdDto, orderStateDto: OrderStateDto): Promise<boolean> {
    const order = await this.internalOrderRepo.getOrder(idDto.id);
    if (!order) return false;

    

    const currentState = order.getOrderState();
    const newState = orderStateDto.state;

    if (
      (currentState === OrderState.PENDING && (newState === OrderState.PROCESSING || newState === OrderState.CANCELLED)) ||
      (currentState === OrderState.PROCESSING && (newState === OrderState.SHIPPED || newState === OrderState.CANCELLED)) ||
      (currentState === OrderState.SHIPPED && (newState === OrderState.DELIVERED || newState === OrderState.CANCELLED))
    ) {
      return this.internalOrderRepo.setOrderState(idDto.id, newState);
    }
    return false;
  }

  async setExternalOrderState(idDto: IdDto, orderStateDto: OrderStateDto): Promise<boolean> {
    const order = await this.externalOrderRepo.getOrder(idDto.id);
    if (!order) return false;

    const currentState = order.getOrderState();
    const newState = orderStateDto.state;

    if (
      (currentState === OrderState.PENDING && (newState === OrderState.PROCESSING || newState === OrderState.CANCELLED)) ||
      (currentState === OrderState.PROCESSING && (newState === OrderState.SHIPPED || newState === OrderState.CANCELLED)) ||
      (currentState === OrderState.SHIPPED && (newState === OrderState.DELIVERED || newState === OrderState.CANCELLED))
    ) {
      return this.externalOrderRepo.setOrderState(idDto.id, newState);
    }
    return false;
  }

  /**
   * Saga example: checks the availability of materials in the inventory.
   * Sends the order details to the inventory microservice and waits for confirmation.
   */
  private async checkInventoryForOrder(orderDetails: any[]): Promise<boolean> {
    const materials = orderDetails.map(d => ({
      id: d.idProduct,
      quantity: d.quantity,
    }));

    const pattern = { cmd: 'checkInventory' };

    try {
      const result = await lastValueFrom(this.natsClient.send(pattern, { materials }));
      console.log('Inventory check result:', result.success);
      return result.success;
    } catch (error) {
      console.error('Error communicating with the inventory microservice:', error);
      return false;
    }
  }

  /**
   * Validates that all required fields are present in the order.
   */
  private validateOrderFields(order: any, requiredFields: string[]) {
    for (const field of requiredFields) {
      if (!order[field]) {
        throw new Error(`Missing or invalid field: ${field}`);
      }
    }
  }

  /**
   * Validates the order details array.
   */
  private validateOrderDetails(orderDetails: any[]) {
    if (!Array.isArray(orderDetails) || orderDetails.length === 0) {
      throw new Error('orderDetails must be a non-empty array');
    }
    for (const d of orderDetails) {
      if (
        !d.idProduct ||
        !d.nameProduct ||
        typeof d.quantity !== 'number' ||
        typeof d.unitaryPrice !== 'number'
      ) {
        throw new Error('Missing or invalid order detail data');
      }
    }
  }

  /**
   * Saves order details to the repository.
   */
  private async saveOrderDetails(orderID: number, orderDetails: any[]) {
    const details = orderDetails.map(d => ({
      orderID,
      idProduct: d.idProduct,
      nameProduct: d.nameProduct,
      quantity: d.quantity,
      unitaryPrice: d.unitaryPrice,
    }));
    await this.orderDetailRepo.insertMany(details);
  }
}