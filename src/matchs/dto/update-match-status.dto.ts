import { IsEnum } from 'class-validator';
import { MatchStatus } from '../match-status.enum';

export class UpdateMatchStatusDto {
  @IsEnum(MatchStatus)
  status: MatchStatus;
}
