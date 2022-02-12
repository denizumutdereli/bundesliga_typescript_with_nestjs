/*eslint-disable*/
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { MatchsController } from './matchs.controller';
import { MatchsRepository } from './matchs.repository';
import { MatchsService } from './matchs.service';

@Module({
  imports: [TypeOrmModule.forFeature([MatchsRepository]), AuthModule],
  controllers: [MatchsController],
  providers: [MatchsService],
})
export class MatchsModule {}
