import {
  Controller,
  Inject,
  Post,
  Body,
  Get,
  Param,
  HttpException,
  UsePipes,
  Query,
  ValidationPipe,
  ParseIntPipe
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IdDto } from './dto/productId.dto';
import { lastValueFrom } from 'rxjs';


@Controller('overseer')
export class OverseerController {
    constructor(@Inject('natsService') private natsClient: ClientProxy) {}

    @Get('products/:productId')
    async getProduct(@Param() idDto: IdDto){

        const pattern = { cmd: 'getProduct' };
        const payload = { id: idDto.productId };

        try {
            return await lastValueFrom(this.natsClient.send(pattern, payload));
        } catch (error) {
            if (error.code === '404') {
                throw new HttpException('Product not found', 404);
            }
            else 
            {
                throw new HttpException('Error fetching product', 500);
            }
        }
        
    }
}
