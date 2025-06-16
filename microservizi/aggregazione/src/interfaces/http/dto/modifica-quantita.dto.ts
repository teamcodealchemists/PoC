import { IsString, IsNumber } from 'class-validator';

export class ModificaQuantitaDto {
  @IsString()
  codice_barre: string;

  @IsNumber()
  nuova_quantita: number;
}
