import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive, IsString, Min, IsNumber } from 'class-validator';

export class OrderDetailDto {
    @Type(() => Number)
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    idProduct: number;

    @Type(() => String)
    @IsNotEmpty()
    @IsString()
    nameProduct: string;

    @Type(() => Number)
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    quantity: number;

    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber({maxDecimalPlaces: 2},{message: 'Unit price must be a number with up to 2 decimal places'})
    @Min(0)
    unitaryPrice: number;
}