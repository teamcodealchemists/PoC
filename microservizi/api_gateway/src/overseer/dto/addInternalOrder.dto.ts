import { 
    IsNotEmpty, 
    IsInt, 
    IsEnum, 
    IsDate, 
    IsPositive,
    IsArray,
    ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderState } from '../../domain/core/orderState.enum';

class OrderDetailDto {
  idProduct: number;
  nameProduct: string;
  quantity: number;
  unitaryPrice: number;
}

export class AddInternalOrderDto {

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

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderDetailDto)
    orderDetails: OrderDetailDto[];

    @IsNotEmpty()
    @IsInt()
    @IsPositive({ message: 'Warehouse departure must be a positive integer' })
    warehouseDeparture: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive({ message: 'Warehouse destination must be a positive integer' })
    warehouseDestination: number;
}
