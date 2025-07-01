import { IsInt, IsNotEmpty, IsNumberString, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class IdDto {
    @Type(() => Number)
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    productId: number;
}