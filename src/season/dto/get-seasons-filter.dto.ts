import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SeasonStatus } from '../season.status.enum';

export class GetSeasonsFilterDto {
  @IsOptional()
  @IsEnum(SeasonStatus)
  status?: SeasonStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
