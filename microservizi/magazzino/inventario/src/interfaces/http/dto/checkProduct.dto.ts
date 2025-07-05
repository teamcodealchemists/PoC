import { IsNotEmpty, Min, IsInt } from 'class-validator';

export class CheckProductDto {
    
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    id : number;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    quantity: number;
}