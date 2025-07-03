// Controller per la gestione degli ordini tramite microservizi
// Import delle dipendenze principali
import { 
  Controller, 
  Get, 
  Post,
  Delete, 
  Patch, 
  Param, 
  Body,
  Inject 
} from '@nestjs/common';

import { OrderState } from '../../domain/core/orderState.enum';
import { OrderHandlerService } from '../../application/OrderHandler.service';
import { AddInternalOrderDto } from './dto/addInternalOrder.dto';
import { AddExternalOrderDto } from './dto/addExternalOrder.dto';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';

// Controller principale per la gestione degli ordini
@Controller()
export class OrderController {
  constructor(
    private readonly orderHandler: OrderHandlerService
  ) {}

  // =====================
  // FUNZIONI DI LETTURA
  // =====================

  // Recupera tutti gli ordini interni
  @MessagePattern({ cmd: `getInternalOrders.${process.env.WAREHOUSE_ID}` })
  async getAllInternalOrders() {
    return this.orderHandler.getAllInternalOrders();
  }

  // Recupera tutti gli ordini esterni
  @MessagePattern({ cmd: `getExternalOrders.${process.env.WAREHOUSE_ID}` })
  async getAllExternalOrders() {
    return this.orderHandler.getAllExternalOrders();
  }

  // Recupera un ordine interno tramite ID
  @MessagePattern({ cmd: `getInternalOrderById.${process.env.WAREHOUSE_ID}` })
  async getInternalOrder(@Payload() orderId: string) {
    return this.orderHandler.getInternalOrder(Number(orderId));
  }

  // Recupera un ordine esterno tramite ID
  @MessagePattern({ cmd: `getExternalOrderById.${process.env.WAREHOUSE_ID}` })
  async getExternalOrder(@Payload() orderId: string) {
    return this.orderHandler.getExternalOrder(Number(orderId));
  }

  // Recupera i dettagli di un ordine (interno o esterno)
  @MessagePattern({ cmd: `getOrderDetails.${process.env.WAREHOUSE_ID}` })
  async getOrderDetails(@Payload() orderId: string) {
    return this.orderHandler.getOrderDetails(Number(orderId));
  }

  // =====================
  // FUNZIONI DI INSERIMENTO
  // =====================

  // Inserisce un nuovo ordine interno
  @MessagePattern({ cmd: `addInternalOrder.${process.env.WAREHOUSE_ID}` })
  async insertInternalOrder(@Payload() order: AddInternalOrderDto) {
    return this.orderHandler.insertInternalOrder(order);
  }

  // Inserisce un nuovo ordine esterno
  @MessagePattern({ cmd: `addExternalOrder.${process.env.WAREHOUSE_ID}` })
  async insertExternalOrder(@Payload() order: AddExternalOrderDto) {
    return this.orderHandler.insertExternalOrder(order);
  }

  // =====================
  // FUNZIONI DI CANCELLAZIONE
  // =====================

  // Cancella un ordine interno tramite ID
  @MessagePattern({ cmd: `cancelInternalOrder.${process.env.WAREHOUSE_ID}` })
  async cancelInternalOrder(@Payload() orderId: string) {
    return this.orderHandler.cancelInternalOrder(Number(orderId));
  }

  // Cancella un ordine esterno tramite ID
  @MessagePattern({ cmd: `cancelExternalOrder.${process.env.WAREHOUSE_ID}` })
  async cancelExternalOrder(@Payload() orderId: string) {
    return this.orderHandler.cancelExternalOrder(Number(orderId));
  }

  // =====================
  // FUNZIONI DI AGGIORNAMENTO STATO
  // =====================

  // Aggiorna lo stato di un ordine interno
  @MessagePattern({ cmd: `setInternalOrderState.${process.env.WAREHOUSE_ID}` })
  async setInternalOrderState(
    @Payload('id') id: string,
    @Payload('newState') newState: OrderState
  ) {
    return this.orderHandler.setInternalOrderState(Number(id), newState);
  }

  // Aggiorna lo stato di un ordine esterno
  @MessagePattern({ cmd: `setExternalOrderState.${process.env.WAREHOUSE_ID}` })
  async setExternalOrderState(
    @Payload('id') id: string,
    @Payload('newState') newState: OrderState
  ) {
    return this.orderHandler.setExternalOrderState(Number(id), newState);
  }
}

