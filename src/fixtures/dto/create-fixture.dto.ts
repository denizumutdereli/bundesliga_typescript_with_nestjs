import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFixtureDto {
  @IsNotEmpty()
  roundNo: number;

  @IsOptional()
  matches: string;

  @IsNotEmpty()
  season: number;

  @IsNotEmpty()
  user: number;
}
