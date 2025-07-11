import { Controller } from '@nestjs/common';
import { SagaMessagesService } from '../../../application/saga-messages.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CheckProductDto } from '../dto/checkProduct.dto';

@Controller()
export class SagaMessagesController {
  constructor(private readonly sagaMessagesService: SagaMessagesService) {}

  @MessagePattern({ cmd: `checkInventory.${process.env.WAREHOUSE_ID}` })
  async checkInventory(@Payload() data: any) {
    let products;
    if (Array.isArray(data.materials)) {
      products = data.materials.map((item: any) => Object.assign(new CheckProductDto(), item));
    } else {
      products = [Object.assign(new CheckProductDto(), data.materials)];
    }
    return await this.sagaMessagesService.checkInventory(products);
  }

  @MessagePattern({ cmd: `refundInventory.${process.env.WAREHOUSE_ID}` })
  async refundInventory(@Payload() data: any) {
    let products;
    if (Array.isArray(data.materials)) {
      products = data.materials.map((item: any) => Object.assign(new CheckProductDto(), item));
    } else {
      products = [Object.assign(new CheckProductDto(), data.materials)];
    }
    return await this.sagaMessagesService.refundInventory(products);
  }
}