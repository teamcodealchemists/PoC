import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventsService } from './events.service.js';
import { StockAddedDto } from './Dtos/StockAddedDto';
import { StockRemovedDto } from './Dtos/StockRemovedDto';

@Controller()
export class EventsMicroserviceController {
  //constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  constructor(private eventsService: EventsService) {}

  // Da cambiare il nome dell'evento con quello concreto
  @EventPattern('stockAdded')
  stockAdded(@Payload() stockAddedDto: StockAddedDto) {
    console.log(stockAddedDto);
    //this.eventsService.stockAdded(stockAddedDto);
  }

  @EventPattern('stockRemoved')
  stockRemoved(@Payload() stockRemovedDto: StockRemovedDto) {
    console.log(stockRemovedDto);
    //this.eventsService.stockRemoved(stockRemovedDto);
  }

  @EventPattern('stockModified')
  stockModified(@Payload() stockModifiedDto: StockAddedDto) {
    console.log(stockModifiedDto);
    //TODO: Implementa la logica per gestire l'evento stockModified
  }

}
