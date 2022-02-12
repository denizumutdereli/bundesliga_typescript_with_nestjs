/*eslint-disable*/
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { SeasonsController } from './seasons.controller';
import { SeasonsRepository } from './seasons.repository';
import { SeasonsService } from './season.service';

@Module({
  imports: [TypeOrmModule.forFeature([SeasonsRepository]), AuthModule],
  controllers: [SeasonsController],
  providers: [SeasonsService],
})
export class SeasonModule {}
