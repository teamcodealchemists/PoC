import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class IdDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  id: number;
}
