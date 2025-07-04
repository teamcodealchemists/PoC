import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive, IsString, Min, MinLength } from 'class-validator';

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
    @IsInt()
    @Min(0)
    unitaryPrice: number;
}