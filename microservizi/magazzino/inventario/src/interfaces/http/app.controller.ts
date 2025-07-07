import {
  Controller,
  UsePipes,
  ValidationPipe,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import { InventoryHandlerService } from 'src/application/inventoryHandler.service';
import { AddProductDto } from './dto/addProduct.dto';
import { IdDto } from './dto/id.dto';
import { EditProductDto } from './dto/editProduct.dto';

const conf = new ConfigService();

@Controller()
export class AppController {
  constructor(private readonly inventoryHandler: InventoryHandlerService) {}

  // ==========================================
  // DIAGNOSTIC & READ FUNCTIONS
  // ==========================================

  /**
   * Diagnostic info for the warehouse.
   * Returns a string with the warehouse ID and total product count.
   */
  @MessagePattern({ cmd: `getInventoryStatus.${process.env.WAREHOUSE_ID}` })
  async getInfo(): Promise<string> {
    const totalQuantity = await this.inventoryHandler.getTotal();
    return `Hello, I am warehouse '${process.env.WAREHOUSE_ID}' and I have ${totalQuantity} products`;
  }

  /**
   * Get a product by its ID.
   * Throws 404 if not found.
   */
  @MessagePattern({ cmd: `getWarehouseProduct.${process.env.WAREHOUSE_ID}` })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async getProductById(@Payload() idDto: IdDto) {
    try {
      return await this.inventoryHandler.findProductById(idDto);
    } catch (error) {
      return { error: error.message, status: 'failed' };
    }
  }

  /**
   * Get the full inventory for the warehouse.
   */
  @MessagePattern({ cmd: `getWarehouseInventory.${process.env.WAREHOUSE_ID}` })
  async getInventory() {
    try {
      const items = await this.inventoryHandler.getInventory();
      return { data: items };
    } catch (error) {
      return { error: error.message, status: 'failed' };
    }
  }

  // ==========================================
  // WRITE FUNCTIONS
  // ==========================================

  /**
   * Add a new product to the warehouse.
   * Returns error if the product already exists.
   */
  @MessagePattern({ cmd: `addProduct.${process.env.WAREHOUSE_ID}` })
  async addProduct(@Payload() newProduct: AddProductDto) {
    console.log(`Adding product to warehouse ${process.env.WAREHOUSE_ID}:`, newProduct);
    try {
      await this.inventoryHandler.addProduct(newProduct);
      return { success: true, message: `Product added to warehouse ${process.env.WAREHOUSE_ID}` };
    } catch (error) {
      return { error: error.message, status: 'failed' };
    }
  }

  /**
   * Remove a product from the warehouse by ID.
   */
  @MessagePattern({ cmd: `removeProduct.${process.env.WAREHOUSE_ID}`})
  async removeProduct(@Payload() idDto: IdDto) {
    console.log(`Removing product from warehouse ${process.env.WAREHOUSE_ID}:`, idDto.id);
    
    try {
      await this.inventoryHandler.removeProduct(idDto);
      return { 
        success: true, 
        message: `Product ${idDto.id} removed from warehouse ${process.env.WAREHOUSE_ID}` 
      };
    } catch (error) {
      return { error: error.message, status: 'failed' };
    }
  }

  /**
   * Edit an existing product in the warehouse.
   */
  @MessagePattern({ cmd: `editProduct.${process.env.WAREHOUSE_ID}` })
  async editProduct(@Payload() body: EditProductDto) {
    try {
      await this.inventoryHandler.editProduct(body);
      return {
        success: true,
        message: `Product ${body.id} edited in warehouse ${process.env.WAREHOUSE_ID}`,
      };
    } catch (error) {
      return { error: error.message, status: 'failed' };
    }
  }
}
