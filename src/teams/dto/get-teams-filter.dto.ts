import { IsOptional, IsString } from 'class-validator';

export class GetTeamsFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
}
