import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Param, 
  Body 
} from '@nestjs/common';

import { OrderState } from '../../domain/core/orderState.enum';
//vado un attimo in bagno ma in teoria rimane solo questi problemi
import { SupplyOrderRepositoryMongo } from '../../infrastructure/adapters/mongo_db/supplyOrder.repository.impl';
import { InternalOrderRepositoryMongo } from '../../infrastructure/adapters/mongo_db/internalOrder.repository.impl';
import { ExternalOrderRepositoryMongo } from '../../infrastructure/adapters/mongo_db/externalOrder.repository.impl';

import { ConcreteSupplyOrder } from '../../domain/core/concreteSupplyOrder';
import { ConcreteInternalOrder } from '../../domain/core/concreteInternalOrder';
import { ConcreteExternalOrder } from '../../domain/core/concreteExternalOrder';
@Controller('orders')
export class OrderController {
  constructor(
    private readonly supplyOrderRepo: SupplyOrderRepositoryMongo,
    private readonly internalOrderRepo: InternalOrderRepositoryMongo,
    private readonly externalOrderRepo: ExternalOrderRepositoryMongo,
  ) {}

  @Get('supply')
  async getAllSupplyOrders() {
    return await this.supplyOrderRepo.getAllOrders();
  }

  @Get('internal')
  async getAllInternalOrders() {
    return await this.internalOrderRepo.getAllOrders();
  }

  @Get('external')
  async getAllExternalOrders() {
    return await this.externalOrderRepo.getAllOrders();
  }

  @Get('supply/:id')
  async getSupplyOrder(@Param('id') id: string) {
    return await this.supplyOrderRepo.getOrder(Number(id));
  }

  @Get('internal/:id')
  async getInternalOrder(@Param('id') id: string) {
    return await this.internalOrderRepo.getOrder(Number(id));
  }

  @Get('external/:id')
  async getExternalOrder(@Param('id') id: string) {
    return await this.externalOrderRepo.getOrder(Number(id));
  }

  @Post('supply')
  async insertSupplyOrder(@Body() order: ConcreteSupplyOrder) {
    return await this.supplyOrderRepo.insertOrder(order);
  }

  @Post('internal')
  async insertInternalOrder(@Body() order: ConcreteInternalOrder) {
    return await this.internalOrderRepo.insertOrder(order);
  }

  @Post('external')
  async insertExternalOrder(@Body() order: ConcreteExternalOrder) {
    return await this.externalOrderRepo.insertOrder(order);
  }

  @Patch('supply/:id/cancel')
  async cancelSupplyOrder(@Param('id') id: string) {
    return await this.supplyOrderRepo.cancelOrder(Number(id));
  }

  @Patch('internal/:id/cancel')
  async cancelInternalOrder(@Param('id') id: string) {
    return await this.internalOrderRepo.cancelOrder(Number(id));
  }

  @Patch('external/:id/cancel')
  async cancelExternalOrder(@Param('id') id: string) {
    return await this.externalOrderRepo.cancelOrder(Number(id));
  }

  @Patch('supply/:id/state')
  async setSupplyOrderState(
    @Param('id') id: string,
    @Body() body: { newState: OrderState }
  ) {
    return await this.supplyOrderRepo.setOrderState(Number(id), body.newState);
  }

  @Patch('internal/:id/state')
  async setInternalOrderState(
    @Param('id') id: string,
    @Body() body: { newState: OrderState }
  ) {
    return await this.internalOrderRepo.setOrderState(Number(id), body.newState);
  }

  @Patch('external/:id/state')
  async setExternalOrderState(
    @Param('id') id: string,
    @Body() body: { newState: OrderState }
  ) {
    return await this.externalOrderRepo.setOrderState(Number(id), body.newState);
  }
}

