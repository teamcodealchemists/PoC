import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Param, 
  Body 
} from '@nestjs/common';

import { OrderState } from '../../domain/core/orderState.enum';

import { OrderHandlerService } from '../../application/OrderHandler.service';

import { ConcreteInternalOrder } from '../../domain/core/concreteInternalOrder';
import { ConcreteExternalOrder } from '../../domain/core/concreteExternalOrder';

import { AddInternalOrderDto } from './dto/addInternalOrder.dto';
import { AddExternalOrderDto } from './dto/addExternalOrder.dto';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderHandler: OrderHandlerService,
  ) {}


  @Get('internal')
  async getAllInternalOrders() {
    return this.orderHandler.getAllInternalOrders();
  }

  @Get('external')
  async getAllExternalOrders() {
    return this.orderHandler.getAllExternalOrders();
  }

  @Get('internal/:id')
  async getInternalOrder(@Param('id') id: string) {
    return this.orderHandler.getInternalOrder(Number(id));
  }

  @Get('external/:id')
  async getExternalOrder(@Param('id') id: string) {
    return this.orderHandler.getExternalOrder(Number(id));
  }

  @Get('details/:orderID')
  async getOrderDetails(@Param('orderID') orderID: string) {
    return this.orderHandler.getOrderDetails(Number(orderID));
  }


  @Post('internal')
  async insertInternalOrder(@Body() order: AddInternalOrderDto) {
    return this.orderHandler.insertInternalOrder(order);
  }

  @Post('external')
  async insertExternalOrder(@Body() order: AddExternalOrderDto) {
    return this.orderHandler.insertExternalOrder(order);
  }


  @Patch('internal/:id/cancel')
  async cancelInternalOrder(@Param('id') id: string) {
    return this.orderHandler.cancelInternalOrder(Number(id));
  }

  @Patch('external/:id/cancel')
  async cancelExternalOrder(@Param('id') id: string) {
    return this.orderHandler.cancelExternalOrder(Number(id));
  }

  @Patch('internal/:id/state')
  async setInternalOrderState(
    @Param('id') id: string,
    @Body() body: { newState: OrderState }
  ) {
    return this.orderHandler.setInternalOrderState(Number(id), body.newState);
  }

  @Patch('external/:id/state')
  async setExternalOrderState(
    @Param('id') id: string,
    @Body() body: { newState: OrderState }
  ) {
    return this.orderHandler.setExternalOrderState(Number(id), body.newState);
  }
}

