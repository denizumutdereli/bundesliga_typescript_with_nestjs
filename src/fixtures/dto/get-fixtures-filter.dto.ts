import { IsOptional, IsString } from 'class-validator';

export class GetFixturesFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
}
