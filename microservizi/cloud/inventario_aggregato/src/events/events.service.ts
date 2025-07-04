import { Injectable, Inject } from '@nestjs/common';

import { StockAddedDto } from './Dtos/StockAddedDto';
import { InventoryRepository } from '../domain/ports/inventario.repository';
import { StockRemovedDto } from './Dtos/StockRemovedDto';

@Injectable()
export class EventsService {
  //constructor();
  constructor(
    @Inject('InventoryRepository')
    private readonly cloudInvRepo: InventoryRepository,
  ) {}

}
