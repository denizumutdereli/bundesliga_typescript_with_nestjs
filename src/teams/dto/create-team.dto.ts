import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  tla: number;

  @IsOptional()
  clubColors: number;

  @IsOptional()
  venue: number;

  @IsNotEmpty()
  season: number;

  @IsNotEmpty()
  user: number;
}
