// src/interfaces/http/dto/aggiorna-quantita.dto.ts
import { IsNumber } from 'class-validator';

export class AggiornaQuantitaDto {
  @IsNumber()
  quantita: number;
}
