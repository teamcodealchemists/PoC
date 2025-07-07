import {
  Controller,
  Inject,
  Post,
  Patch,
  Body,
  Get,
  Param,
  HttpException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IdDto } from './dto/productId.dto';
import { AddProductDto } from './dto/addProduct.dto';
import { EditProductDto } from './dto/editProduct.dto';
import { WarehouseIdDto } from './dto/warehouseId.dto';
import { lastValueFrom } from 'rxjs';

@Controller()
export class OverseerController {
  constructor(@Inject('natsService') private natsClient: ClientProxy) {}

  @Get('getStatus/:warehouseId')
  async getStatus(@Param() warehouseId: WarehouseIdDto): Promise<any> {
    const pattern = { cmd: `getStatus.${warehouseId.warehouseId}` };
    return await lastValueFrom(this.natsClient.send(pattern, {}));
  }

  //TODO: Rimuove in quanto noi controlliamo a livello aggregato e non nel singolo magazzino (Solo test per ora)
  @Get('product/:productId')
  async getProduct(@Param() idDto: IdDto): Promise<any> {
    const pattern = { cmd: 'getProduct' };
    const payload = { id: idDto.id };

    try {
      return await lastValueFrom(this.natsClient.send(pattern, payload));
    } catch (error) {
      // Se l'errore arriva da RpcException, avrà error.code e error.message
      if (error.code === 404) {
        throw new HttpException('Product not found', 404);
      } else {
        throw new HttpException('Error fetching product', 500);
      }
    }
  }

  @Get('warehouseInventory/:warehouseId')
    async getWarehouseInventory(@Param('warehouseId') warehouseId: string) {
        const pattern = { cmd: `getWarehouseInventory.${warehouseId}` };
        try {
            return await lastValueFrom(this.natsClient.send(pattern, {}));
        } catch (error) {
            throw new HttpException(error?.message || 'Error fetching warehouse inventory', error?.code || 500);
        }
    }

  //Andiamo a creare un nuovo prodotto in un magazzino specifico
  @Post('addProduct/:warehouseId')
  async addProduct(
    @Param() warehouseId: WarehouseIdDto,
    @Body() newProduct: AddProductDto,
  ) {
    const pattern = { cmd: `addProduct.${warehouseId.warehouseId}` };
    try {
      const response = await lastValueFrom(this.natsClient.send(pattern, newProduct));
      if (response?.success) return response;
      throw new HttpException(
        response?.message || 'Unknown response from warehouse service',
        response?.code || 500,
      );
    } catch (error) {
      throw new HttpException(
        error?.message || 'Error adding product',
        error?.code || 500,
      );
    }
  }

  //Andiamo a modificare un prodotto in un magazzino specifico
  @Patch('editProduct/:warehouseId')
  async editProduct(
    @Param() warehouseId: WarehouseIdDto,
    @Body() updatedProduct: EditProductDto,
  ) {
    const pattern = { cmd: `editProduct.${warehouseId.warehouseId}` };
    if (
      updatedProduct.quantity === undefined &&
      updatedProduct.minQuantity === undefined &&
      updatedProduct.maxQuantity === undefined
    ) {
      throw new HttpException(
        'At least one field must be provided for editing',
        400,
      );
    } else {
      try {
        const response = await lastValueFrom(
          this.natsClient.send(pattern, updatedProduct),
        );
        if (response?.success) return response;
        throw new HttpException(
          response?.message || 'Unknown response from warehouse service',
          response?.code || 500,
        );
      } catch (error) {
        throw new HttpException(
          error?.message || 'Error editing product',
          error?.code || 500,
        );
      }
    }
  }

  @Post('removeProduct/:warehouseId')
  async removeProduct(
    @Param() warehouseId: WarehouseIdDto,
    @Body() idDto: IdDto,
  ) {
    const pattern = { cmd: `removeProduct.${warehouseId.warehouseId}` };
    try {
      const response = await lastValueFrom(this.natsClient.send(pattern, idDto));
      if (response?.success) return response;
      throw new HttpException(
        response?.message || 'Unknown response from warehouse service',
        response?.code || 500,
      );
    } catch (error) {
      throw new HttpException(
        error?.message || 'Error removing product',
        error?.code || 500,
      );
    }
  }
}
