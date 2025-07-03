import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Param, 
  Body 
} from '@nestjs/common';

import { OrderHandlerService } from '../../application/OrderHandler.service';

import { ConcreteInternalOrder } from '../../domain/core/concreteInternalOrder';
import { ConcreteExternalOrder } from '../../domain/core/concreteExternalOrder';

import { AddInternalOrderDto } from './dto/addInternalOrder.dto';
import { AddExternalOrderDto } from './dto/addExternalOrder.dto';
import { IdDto } from './dto/id.dto';
import { OrderStateDto } from './dto/orderState.dto';

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
  async getInternalOrder(@Param() idDto: IdDto) {
    return this.orderHandler.getInternalOrder(idDto);
  }

  @Get('external/:id')
  async getExternalOrder (@Param() idDto: IdDto) {
    return this.orderHandler.getExternalOrder(idDto);
  }

  @Get('details/:id')
  async getOrderDetails(@Param() idDto: IdDto) {
    return this.orderHandler.getOrderDetails((idDto));
  }


  @Post('internal')
  async insertInternalOrder(@Body() order: AddInternalOrderDto) {
    return this.orderHandler.insertInternalOrder(order);
  }

  @Post('external')
  async insertExternalOrder(@Body() order: AddExternalOrderDto) {
    return this.orderHandler.insertExternalOrder(order);
  }

  @Patch('internal/:id/state')
  async setInternalOrderState(
    @Param() idDto: IdDto,
    @Body() orderStateDto: OrderStateDto
  ) {
    return this.orderHandler.setInternalOrderState(idDto, orderStateDto);
  }

  @Patch('external/:id/state')
  async setExternalOrderState(
    @Param() idDto: IdDto,
    @Body()  orderStateDto: OrderStateDto
  ) {
    return this.orderHandler.setExternalOrderState(idDto, orderStateDto);
  }
}

