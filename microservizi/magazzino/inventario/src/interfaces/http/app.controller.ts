import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { InventoryHandlerService } from 'src/application/inventoryHandler.service';

import { AddProductDto } from './dto/addProduct.dto';
import { IdDto } from './dto/id.dto';
import { EditProductDto } from './dto/editProduct.dto';

@Controller()
export class AppController {
  constructor(private readonly InventoryHandlerService: InventoryHandlerService) { }

  // Informazioni di Diagnostica Magazzino 
  @Get('whoareyou')
  async getInfo(): Promise<string> {
    const quantitaTotale = await this.InventoryHandlerService.getTotal();
    return `Ciao sono il magazzino '1' ed ho ${quantitaTotale} prodotti`;
  }

  @Get('product/:id')
  findProductById(@Param('id') id: string) {
    let idVer= new IdDto();
    idVer.id = parseInt(id, 10);
    return this.InventoryHandlerService.findProductById(idVer);
  }

  @Post('addProduct')
  async addProduct(@Body() newProduct: AddProductDto) {
    return this.InventoryHandlerService.addProduct(newProduct);
  }

  @Get('inventory')
  getInventory() {
    return this.InventoryHandlerService.getInventory();
  }

  @Delete('removeProduct/:id')
  async removeProduct(@Param('id') id: string) {
    let idVer= new IdDto();
    idVer.id = parseInt(id, 10);
    return this.InventoryHandlerService.removeProduct(idVer);
  }

  @Patch('editProduct/:id')
  editProduct(
    @Param('id') id: string,
    @Body() body: EditProductDto
  ) {
    let idVer= new IdDto();
    idVer.id = parseInt(id, 10);
    return this.InventoryHandlerService.editProduct(idVer, body);
  }

}
