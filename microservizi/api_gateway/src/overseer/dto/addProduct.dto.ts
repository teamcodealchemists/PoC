import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, Min, IsInt, IsNumber, IsOptional } from 'class-validator';

export class AddProductDto {
  
    @Type(() => Number)
    @IsNotEmpty()
    @IsInt()
    id : number;

    @Type(() => String)
    @IsNotEmpty()
    @IsString()
    name : string;

    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber({maxDecimalPlaces: 2},{message: 'Unit price must be a number with up to 2 decimal places'})
    @Min(0)
    unitPrice: number;

    @Type(() => Number)
    @IsInt()
    @Min(0)
    @IsOptional()
    quantity: number;

    @Type(() => Number)
    @IsInt()
    @Min(0)
    @IsOptional()
    minQuantity: number;

    @Type(() => Number)
    @IsInt()
    @Min(0)
    @IsOptional()
    maxQuantity: number;
}