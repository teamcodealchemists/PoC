import { Controller, Get, Param, Post, Body, Delete, Patch, HttpException, HttpStatus, UsePipes, ValidationPipe, NotFoundException } from '@nestjs/common';
import { InventoryHandlerService } from 'src/application/inventoryHandler.service';
import { RpcException } from '@nestjs/microservices';

import { AddProductDto } from './dto/addProduct.dto';
import { IdDto } from './dto/id.dto';
import { EditProductDto } from './dto/editProduct.dto';

import { ConfigService } from '@nestjs/config';
import { MessagePattern, Payload } from '@nestjs/microservices';

let conf = new ConfigService();

@Controller()
export class AppController {
  constructor(private readonly InventoryHandlerService: InventoryHandlerService) { }

  // Informazioni di Diagnostica Magazzino 
  @MessagePattern({ cmd:  `getStatus.${process.env.WAREHOUSE_ID}` })
  async getStatus(): Promise<string> {
    const quantitaTotale = await this.InventoryHandlerService.getTotal();
    return `Ciao sono il magazzino '${process.env.WAREHOUSE_ID}' ed ho ${quantitaTotale} prodotti`;
  }

  // Gestione dei messaggi NATS per il microservizio di magazzino
  @MessagePattern({ cmd: 'getProduct' })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async getProductById(@Payload() idDto: IdDto) {
    try {
      return await this.InventoryHandlerService.findProductById(idDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new RpcException({ code: 404, message: 'Product not found' });
      }
      throw new RpcException({ code: 500, message: error.message });
    }
  }


  // Aggiunta di un nuovo prodotto al magazzino
  @MessagePattern({ cmd: `addProduct.${process.env.WAREHOUSE_ID}`})
  async addProduct(@Payload() newProduct: AddProductDto) {
    console.log(`Adding product to warehouse ${process.env.WAREHOUSE_ID}:`, newProduct);
    try {
      await this.InventoryHandlerService.addProduct(newProduct);
      return { success: true, message: `Product added to warehouse ${process.env.WAREHOUSE_ID}` };
    } catch (error) {
      if (error instanceof RpcException && error.message?.includes('already exists')) {
      throw new RpcException({ code: 409, message: 'Product already added to warehouse' });
      }
      if (error.message?.includes('already exists')) {
      throw new RpcException({ code: 409, message: 'Product already added to warehouse' });
      }
      console.error(`Error adding product to warehouse ${process.env.WAREHOUSE_ID}:`, error);
      throw new RpcException({ code: 500, message: error.message });
    }
  }

  @MessagePattern({ cmd: `getInventory.${process.env.WAREHOUSE_ID}`})
  async getInventoryByWarehouse(): Promise<any> {
    try {
      const items = await this.InventoryHandlerService.getInventory();
      return { data: items };
    } catch (error) {
      console.error(`Error fetching inventory for warehouse ${process.env.WAREHOUSE_ID}:`, error);
      throw new RpcException({ code: 500, message: error.message });
    }
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

  @MessagePattern({ cmd: `editProduct.${process.env.WAREHOUSE_ID}`})
  async editProduct(@Payload() body: EditProductDto) {
    try {
      await this.InventoryHandlerService.editProduct(body);
      return { success: true, message: `Product ${body.id} edited in warehouse ${process.env.WAREHOUSE_ID}` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new RpcException({ code: 404, message: 'Product not found' });
      }
      throw new RpcException({ code: 500, message: error.message });
    }
  }

}
