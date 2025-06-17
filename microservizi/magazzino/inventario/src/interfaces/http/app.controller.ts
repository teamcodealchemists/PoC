import { Controller, Get, Param, Post, Body, Delete, Patch, HttpException, HttpStatus } from '@nestjs/common';
import { InventoryHandlerService } from 'src/application/inventoryHandler.service';

import { AddProductDto } from './dto/addProduct.dto';
import { IdDto } from './dto/id.dto';
import { EditProductDto } from './dto/editProduct.dto';

import { ConfigService } from '@nestjs/config';

let conf = new ConfigService();

@Controller()
export class AppController {
  constructor(private readonly InventoryHandlerService: InventoryHandlerService) { }

  // Informazioni di Diagnostica Magazzino 
  @Get('whoareyou')
  async getInfo(): Promise<string> {
    const quantitaTotale = await this.InventoryHandlerService.getTotal();
    return `Ciao sono il magazzino '${conf.get<string>("WAREHOUSE_ID")}' ed ho ${quantitaTotale} prodotti`;
  }

  @Get('product/:id')
  async findProductById(@Param('id') id: string) {
    try {
    let idVer= new IdDto();
    idVer.id = parseInt(id, 10);
    const product = await this.InventoryHandlerService.findProductById(idVer);
    return { data: product };
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: error.message},
        HttpStatus.NOT_FOUND, {
        cause: error
      });
      }
  }

  @Post('addProduct')
  async addProduct(@Body() newProduct: AddProductDto) {
    await this.InventoryHandlerService.addProduct(newProduct);
  }

  @Get('inventory')
  async getInventory() {
    const items = await this.InventoryHandlerService.getInventory();
    return { data: items };
  }

  @Delete('removeProduct/:id')
  async removeProduct(@Param('id') id: string) {
    let idVer= new IdDto();
    idVer.id = parseInt(id, 10);
    await this.InventoryHandlerService.removeProduct(idVer);
  }

  @Patch('editProduct/:id')
  async editProduct(
    @Param('id') id: string,
    @Body() body: EditProductDto
  ) {
    let idVer= new IdDto();
    idVer.id = parseInt(id, 10);
    await this.InventoryHandlerService.editProduct(idVer, body);
  }

  //TODO: Controllare se si possono aggiungere errori a runtime alla risposta HTTP

}
