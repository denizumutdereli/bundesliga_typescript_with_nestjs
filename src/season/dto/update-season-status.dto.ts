import { IsEnum } from 'class-validator';
import { SeasonStatus } from '../season.status.enum';

export class UpdateSeasonStatusDto {
  @IsEnum(SeasonStatus)
  status: SeasonStatus;
}
