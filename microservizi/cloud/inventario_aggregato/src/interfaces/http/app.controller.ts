import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { AppService } from '../../application/app.service';
import { StockAddedDto } from 'src/events/Dtos/StockAddedDto';
import { StockRemovedDto } from 'src/events/Dtos/StockRemovedDto';
import { SyncEventDto } from 'src/events/Dtos/SyncEventDto';
import { EventPattern, Payload } from '@nestjs/microservices';
// import { CreaProdottoDto } from './dto/crea-prodotto.dto';
// import { AggiornaQuantitaDto } from './dto/aggiorna-quantita.dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('whoareyou')
  async getInfo(): Promise<string> {
    return `Ciao! Sono il servizio di aggregazione Cloud!`;
  }

  @Get('findAllProduct')
  findAllProduct() {
    return this.appService.findAllProduct();
  }

  @Get('inventario')
  getInventory() {
    return this.appService.getInventory();
  }

  @Get('findAll')
  async findAll() {
    return this.appService.findAll();
  }

  @Post('syncAddStock')
  async syncAddStock(@Body() stock: StockAddedDto) {
    return this.appService.syncAddStock(stock);
  }

  @Post('syncRemoveStock')
  async syncRemoveStock(@Body() stock: StockRemovedDto) {
    return this.appService.syncRemoveStock(stock);
  }

  @Post('syncEditStock')
  async syncEditStock(@Body() stock: SyncEventDto) {
    return this.appService.syncEditStock(stock);
  }

  @EventPattern('stockEdited')
  async handleStockEdited(@Payload() data: SyncEventDto) {
    console.log(`📥 Evento stockEdited ricevuto da ${data.source}:`, {
      barCode: data.barCode,
      warehouseId: data.warehouseId,
      quantity: data.quantity
    });

    try {
      // Chiama il metodo syncEditStock esistente
      await this.appService.syncEditStock(data);
      
      console.log(`✅ Stock sincronizzato nel cloud per ${data.barCode}`);
      
      return { 
        success: true, 
        message: `Stock ${data.barCode} sincronizzato`,
        warehouseId: data.warehouseId
      };
    } catch (error) {
      console.error(`❌ Errore sincronizzazione:`, error);
      return { 
        success: false, 
        message: error.message 
      };
    }
  }

  @EventPattern('stockAdded')
  async handleStockAdded(@Payload() data: SyncEventDto) {
    console.log(`📥 Evento stockAdded ricevuto da ${data.source}:`, {
      barCode: data.barCode,
      warehouseId: data.warehouseId,
      quantity: data.quantity
    });

    try {
      // Chiama il metodo syncAddStock esistente
      await this.appService.syncAddStock(data);
      
      console.log(`✅ Stock sincronizzato nel cloud per ${data.barCode}`);
      
      return { 
        success: true, 
        message: `Stock ${data.barCode} sincronizzato`,
        warehouseId: data.warehouseId
      };
    } catch (error) {
      console.error(`❌ Errore sincronizzazione:`, error);
      return { 
        success: false, 
        message: error.message 
      };
    }
  }

  @EventPattern('stockRemoved')
  async handleStockRemoved(@Payload() data: SyncEventDto) {
    console.log(`📥 Evento stockRemoved ricevuto da ${data.source}:`, {
      barCode: data.barCode,
      warehouseId: data.warehouseId,
      quantity: data.quantity
    });

    try {
      // Chiama il metodo syncRemoveStock esistente
      await this.appService.syncRemoveStock(data);
      
      console.log(`✅ Stock rimosso dal cloud per ${data.barCode}`);
      
      return { 
        success: true, 
        message: `Stock ${data.barCode} rimosso`,
        warehouseId: data.warehouseId
      };
    } catch (error) {
      console.error(`❌ Errore sincronizzazione:`, error);
      return { 
        success: false, 
        message: error.message 
      };
    }
  }

}