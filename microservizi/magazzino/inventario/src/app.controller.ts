import { Controller, Get, Post, Body} from '@nestjs/common';
import { AppService } from './app.service';
import { InventoryHandlerCommand } from './application/inventoryHandler.command';
import { AddProductDto } from './interface/dto/addProduct.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly inventoryHandlerCommand: InventoryHandlerCommand
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Post('addProduct')
  async addProduct(@Body() dto: AddProductDto): Promise<string> {
    await this.inventoryHandlerCommand.addProduct(dto);
    return 'Product added successfully';
  }
}
