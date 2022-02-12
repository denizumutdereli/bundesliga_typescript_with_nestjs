import { IsEnum, IsOptional, IsString } from 'class-validator';
import { MatchStatus } from '../match-status.enum';

export class GetMatchsFilterDto {
  @IsOptional()
  @IsEnum(MatchStatus)
  status?: MatchStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
