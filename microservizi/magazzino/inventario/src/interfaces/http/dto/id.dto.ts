import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class IdDto {
    @Type(() => Number)
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    id : number;
}


