import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class IdDto {
  
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    id : number;
}


