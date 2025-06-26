import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Param, 
  Body 
} from '@nestjs/common';

import { OrderState } from '../../domain/core/orderState.enum';

import { InternalOrderRepositoryMongo } from '../../infrastructure/adapters/mongo_db/internalOrder.repository.impl';
import { ExternalOrderRepositoryMongo } from '../../infrastructure/adapters/mongo_db/externalOrder.repository.impl';

import { ConcreteInternalOrder } from '../../domain/core/concreteInternalOrder';
import { ConcreteExternalOrder } from '../../domain/core/concreteExternalOrder';
@Controller('orders')
export class OrderController {
  constructor(
    private readonly internalOrderRepo: InternalOrderRepositoryMongo,
    private readonly externalOrderRepo: ExternalOrderRepositoryMongo,
  ) {}


  @Get('internal')
  async getAllInternalOrders() {
    console.log("Boh ciao funziono forse");
    return await this.internalOrderRepo.getAllOrders();
  }

  @Get('external')
  async getAllExternalOrders() {
    return await this.externalOrderRepo.getAllOrders();
  }

  @Get('internal/:id')
  async getInternalOrder(@Param('id') id: string) {
    return await this.internalOrderRepo.getOrder(Number(id));
  }

  @Get('external/:id')
  async getExternalOrder(@Param('id') id: string) {
    return await this.externalOrderRepo.getOrder(Number(id));
  }


  @Post('internal')
  async insertInternalOrder(@Body() order: ConcreteInternalOrder) {
    return await this.internalOrderRepo.insertOrder(order);
  }

  @Post('external')
  async insertExternalOrder(@Body() order: ConcreteExternalOrder) {
    return await this.externalOrderRepo.insertOrder(order);
  }


  @Patch('internal/:id/cancel')
  async cancelInternalOrder(@Param('id') id: string) {
    return await this.internalOrderRepo.cancelOrder(Number(id));
  }

  @Patch('external/:id/cancel')
  async cancelExternalOrder(@Param('id') id: string) {
    return await this.externalOrderRepo.cancelOrder(Number(id));
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

