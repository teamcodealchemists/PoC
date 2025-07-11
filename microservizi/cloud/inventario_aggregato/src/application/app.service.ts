import { Injectable, Inject } from '@nestjs/common';
import { InventoryRepository } from '../domain/ports/inventario.repository';
// import { CreaProdottoDto } from '../interfaces/http/dto/crea-prodotto.dto';


@Injectable()
export class AppService {
  constructor(
    @Inject('InventoryRepository')
    private readonly inventoryRepo: InventoryRepository,
  ) {}

  async findAllProduct() {
    return this.inventoryRepo.findAllProduct();
  }

  async findAll() {
    return this.inventoryRepo.findAll();
  }
}

