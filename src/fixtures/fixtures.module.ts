/*eslint-disable*/
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { FixturesRepository } from './fixtures.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FixturesRepository]), AuthModule],
  controllers: [],
  providers: [],
})
export class FixtureModule {}
