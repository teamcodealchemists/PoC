import { 
    IsNotEmpty, 
    IsInt, 
    IsEnum, 
    IsDate, 
    IsPositive,
    IsArray,
    ValidateNested, 
    ArrayMinSize
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderState } from '../../domain/core/orderState.enum';
import { OrderDetailDto } from './OrderDetail.dto';


export class AddExternalOrderDto {

    @Type(() => Number)
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    orderID: number;

    @Type(() => String)
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

    @Type(() => Number)
    @IsNotEmpty()
    @IsInt()
    @IsPositive({ message: 'Warehouse departure must be a positive integer' })
    warehouseDeparture: number;

    @Type(() => Number)
    @IsNotEmpty()
    @IsInt()
    @IsPositive({ message: 'External address must be a positive integer' })
    externalAddress: number;
}