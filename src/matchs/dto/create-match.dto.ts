import { IsNotEmpty } from 'class-validator';

export class CreateMatchDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
