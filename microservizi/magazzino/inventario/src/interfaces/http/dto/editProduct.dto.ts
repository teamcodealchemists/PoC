import { Min, IsInt, IsOptional, IsNotEmpty } from 'class-validator';

export class EditProductDto {
    
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    id : number;

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