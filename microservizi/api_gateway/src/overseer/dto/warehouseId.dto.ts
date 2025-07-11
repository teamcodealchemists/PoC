import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt, Min } from 'class-validator';

export class WarehouseIdDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  warehouseId: number;
}
