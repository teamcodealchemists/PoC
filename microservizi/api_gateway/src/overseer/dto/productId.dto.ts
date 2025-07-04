import { IsInt, IsNotEmpty, IsNumberString, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class IdDto {
    @Transform(({ value }) => typeof value === 'string' && value.trim() !== '' ? Number(value) : value, { toClassOnly: true })
    @Type(() => Number)
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    id: number;
}