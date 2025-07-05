import { Controller } from '@nestjs/common';
import { SagaMessagesService } from '../../../application/saga-messages.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CheckProductDto } from '../dto/checkProduct.dto';

@Controller()
export class SagaMessagesController {
  constructor(private readonly sagaMessagesService: SagaMessagesService) {}

  @MessagePattern({ cmd: 'checkInventory' })
  async checkInventory(@Payload() data: any) {
    let products;
    if (Array.isArray(data.materials)) {
      products = data.materials.map((item: any) => Object.assign(new CheckProductDto(), item));
      console.log('Mapped products:', products);
    } else {
      products = [Object.assign(new CheckProductDto(), data.materials)];
    }
    return await this.sagaMessagesService.checkInventory(products);
  }
}