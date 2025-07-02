import { IsEnum } from 'class-validator';
import { OrderState } from '../../../domain/core/orderState.enum';

export class OrderStateDto {
  @IsEnum(OrderState)
  newState: OrderState;
}