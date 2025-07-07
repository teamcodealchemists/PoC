import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventsService } from './events.service.js';
import { SyncEventDto } from './Dtos/SyncEventDto.js';

@Controller()
export class EventsMicroserviceController {
  constructor(private readonly eventsService: EventsService) {}

  @EventPattern('stockEdited')
  async handleStockEdited(@Payload() data: SyncEventDto) {
    console.log(`📥 Evento stockEdited ricevuto da ${data.source}:`, {
      barCode: data.barCode,
      warehouseId: data.warehouseId,
      quantity: data.quantity
    });

    try {
      // Chiama il metodo syncEditStock esistente
      await this.eventsService.syncEditStock(data);
      
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
      await this.eventsService.syncAddStock(data);
      
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
      await this.eventsService.syncRemoveStock(data);
      
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
