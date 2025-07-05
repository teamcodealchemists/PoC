import { IsEnum } from 'class-validator';
import { OrderState } from '../../../domain/core/orderState.enum';
import { Type } from 'class-transformer';

export class OrderStateDto {
  @Type(() => String)
  @IsEnum(OrderState)
  state: OrderState;
}