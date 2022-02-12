/*eslint-disable*/
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TeamsRepository } from './teams.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TeamsRepository]), AuthModule],
  controllers: [],
  providers: [],
})
export class TeamModule {}
