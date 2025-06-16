import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreaProdottoDto {
  @IsString()
  codice_barre: string;

  @IsString()
  nome_prodotto: string;

  @IsNumber()
  prezzo_unitario: number;

  @IsNumber()
  quantita: number;

  @IsOptional()
  @IsNumber()
  quantita_minima?: number;

  @IsOptional()
  @IsNumber()
  quantita_massima?: number;
}
