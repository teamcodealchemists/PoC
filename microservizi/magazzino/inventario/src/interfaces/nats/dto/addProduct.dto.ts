import { IsNotEmpty, IsString, Min, IsInt, IsNumber, IsOptional } from 'class-validator';

export class AddProductDto {
    
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    id : number;

    @IsNotEmpty()
    @IsString()
    name : string;

    @IsNotEmpty()
    @IsNumber({maxDecimalPlaces: 2},{message: 'Unit price must be a number with up to 2 decimal places'})
    @Min(0)
    unitPrice: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    quantity: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    minQuantity: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    maxQuantity: number;    
}