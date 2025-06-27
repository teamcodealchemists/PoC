import { 
    IsNotEmpty, 
    IsInt, 
    IsEnum, 
    IsDate, 
    IsPositive,
    ValidateNested, 
    ArrayMinSize
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderState } from '../../../domain/core/orderState.enum';

class ProductQuantityDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  idProduct: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive({ message: 'Quantity must be a positive integer' })
  quantity: number;
}

export class AddExternalOrderDto {

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    orderID: number;

    @IsNotEmpty()
    @IsEnum(OrderState, { message: 'Order state must be a valid OrderState enum value' })
    orderState: OrderState;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate({ message: 'Creation date must be a valid date' })
    creationDate: Date;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate({ message: 'Time to arrive must be a valid date' })
    timeToArrive: Date;

    @ValidateNested({ each: true })
    @Type(() => ProductQuantityDto)
    @ArrayMinSize(1)
    products: ProductQuantityDto[];
  
    @IsNotEmpty()
    @IsInt()
    @IsPositive({ message: 'Warehouse departure must be a positive integer' })
    warehouseDeparture: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive({ message: 'External address must be a positive integer' })
    externalAddress: number;
}