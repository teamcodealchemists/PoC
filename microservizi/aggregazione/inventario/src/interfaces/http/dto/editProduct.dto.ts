import { Min, IsInt, IsOptional } from 'class-validator';

export class EditProductDto {
  
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