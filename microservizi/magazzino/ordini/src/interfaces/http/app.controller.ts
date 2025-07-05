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
  Inject, 
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { OrderHandlerService } from '../../application/OrderHandler.service';
import { AddInternalOrderDto } from './dto/addInternalOrder.dto';
import { AddExternalOrderDto } from './dto/addExternalOrder.dto';
import { IdDto } from './dto/id.dto';
import { OrderStateDto } from './dto/orderState.dto';
import { ClientProxy, Ctx, MessagePattern, Payload } from '@nestjs/microservices';
import { response } from 'express';

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
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async getAllInternalOrders() {
    return this.orderHandler.getAllInternalOrders();
  }

  // Recupera tutti gli ordini esterni
  @MessagePattern({ cmd: `getExternalOrders.${process.env.WAREHOUSE_ID}` })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async getAllExternalOrders() {
    return this.orderHandler.getAllExternalOrders();
  }

  // Recupera un ordine interno tramite ID
  @MessagePattern({ cmd: `getInternalOrderById.${process.env.WAREHOUSE_ID}` })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async getInternalOrder(@Payload() orderId: IdDto) {
    return this.orderHandler.getInternalOrder(orderId);
  }

  // Recupera un ordine esterno tramite ID
  @MessagePattern({ cmd: `getExternalOrderById.${process.env.WAREHOUSE_ID}` })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async getExternalOrder(@Payload() orderId: IdDto) {
    return this.orderHandler.getExternalOrder(orderId);
  }

  // Recupera i dettagli di un ordine (interno o esterno)
  @MessagePattern({ cmd: `getOrderDetails.${process.env.WAREHOUSE_ID}` })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async getOrderDetails(@Payload() orderId: IdDto) {
    return this.orderHandler.getOrderDetails(orderId);
  }

  // ==========================================
  // FUNZIONI DI INSERIMENTO
  // ==========================================

  // Inserisce un nuovo ordine interno
  @MessagePattern({ cmd: `addInternalOrder.${process.env.WAREHOUSE_ID}` })
  async insertInternalOrder(@Payload() order: AddInternalOrderDto) {
    try {
      return await this.orderHandler.insertInternalOrder(order);
    } catch (error) {
      console.error('Error inserting internal order:', error.message);
      return { error: error.message, status: 'failed' };
    }
  }

  // Inserisce un nuovo ordine esterno
  @MessagePattern({ cmd: `addExternalOrder.${process.env.WAREHOUSE_ID}` })
  async insertExternalOrder(@Payload() order: AddExternalOrderDto) {
    try {
      return await this.orderHandler.insertExternalOrder(order);
    } catch (error) {
      return { error: error.message };
    }
  }

  // =====================
  // FUNZIONI DI AGGIORNAMENTO STATO
  // =====================

  // Aggiorna lo stato di un ordine interno tramite NATS
  @MessagePattern({ cmd: `setInternalOrderState.${process.env.WAREHOUSE_ID}` })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async setInternalOrderState(
    @Payload("id") id : number,
    @Payload("state") state : any
  ) {
    const IdDto: IdDto = { id: id };
    const data: OrderStateDto = { state: state };
    try {
      return this.orderHandler.setInternalOrderState(IdDto, data);
    } catch (error) {
      return { error: error.message };
    }
  }

  // Aggiorna lo stato di un ordine esterno tramite NATS
  @MessagePattern({ cmd: `setExternalOrderState.${process.env.WAREHOUSE_ID}` })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async setExternalOrderState(
    @Payload("id") id: number,
    @Payload("state") state: any
  ) {
    const idDto: IdDto = { id: id };
    const orderStateDto: OrderStateDto = { state: state };
    try {
      return this.orderHandler.setExternalOrderState(idDto, orderStateDto);
    } catch (error) {
      return { error: error.message };
    }
  }
}

