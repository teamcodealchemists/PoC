import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from '../../application/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'getStatusInventoryCloud' })
  async getInfo(): Promise<string> {
    return `Hello i am the Cloud inventory aggregation service!`;
  }

  @MessagePattern({ cmd: 'getAllProduct' })
  findAllProduct() {
    return this.appService.findAllProduct();
  }

  @MessagePattern({ cmd: 'getAllInventory' })
  async findAll() {
    return this.appService.findAll();
  }
}
