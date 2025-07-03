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
import { OrderHandlerService } from '../../application/OrderHandler.service';
import { AddInternalOrderDto } from './dto/addInternalOrder.dto';
import { AddExternalOrderDto } from './dto/addExternalOrder.dto';
import { IdDto } from './dto/id.dto';
import { OrderStateDto } from './dto/orderState.dto';
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
  async getInternalOrder(@Payload() orderId: IdDto) {
    return this.orderHandler.getInternalOrder(orderId);
  }

  // Recupera un ordine esterno tramite ID
  @MessagePattern({ cmd: `getExternalOrderById.${process.env.WAREHOUSE_ID}` })
  async getExternalOrder(@Payload() orderId: IdDto) {
    return this.orderHandler.getExternalOrder(orderId);
  }

  // Recupera i dettagli di un ordine (interno o esterno)
  @MessagePattern({ cmd: `getOrderDetails.${process.env.WAREHOUSE_ID}` })
  async getOrderDetails(@Payload() orderId: IdDto) {
    return this.orderHandler.getOrderDetails(orderId);
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

  @Patch('internal/:id/state')
  async setInternalOrderState(
    @Param() idDto: IdDto,
    @Body() orderStateDto: OrderStateDto
  ) {
    return this.orderHandler.setInternalOrderState(idDto, orderStateDto);
  }

  // Aggiorna lo stato di un ordine esterno
  @Patch('external/:id/state')
  async setExternalOrderState(
    @Param() idDto: IdDto,
    @Body()  orderStateDto: OrderStateDto
  ) {
    return this.orderHandler.setExternalOrderState(idDto, orderStateDto);
  }
}

