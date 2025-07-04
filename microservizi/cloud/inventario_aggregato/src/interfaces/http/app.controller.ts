import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { AppService } from '../../application/app.service';
import { StockAddedDto } from 'src/events/Dtos/StockAddedDto';
import { StockRemovedDto } from 'src/events/Dtos/StockRemovedDto';
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
  async syncEditStock(@Body() stock: StockAddedDto) {
    return this.appService.syncEditStock(stock);
  }

}