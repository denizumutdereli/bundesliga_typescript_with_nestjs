import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSeasonDto {
  @IsOptional()
  name: string;

  @IsOptional()
  yearStart: number;

  @IsNotEmpty()
  numberOfTeams: number;
}
