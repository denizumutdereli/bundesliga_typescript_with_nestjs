/*eslint-disable*/
import { Injectable, NotFoundException } from '@nestjs/common';
import { SeasonStatus } from './season.status.enum';
import { CreateSeasonDto } from './dto/create-season.dto';
import { GetSeasonsFilterDto } from './dto/get-seasons-filter.dto';
import { SeasonsRepository } from './seasons.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Season } from './season.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class SeasonsService {
  constructor(
    @InjectRepository(SeasonsRepository)
    private seasonsRepository: SeasonsRepository,
  ) { }

  getSeasons(filterDto: GetSeasonsFilterDto, user: User): Promise<Season[]> {
    return this.seasonsRepository.getSeasons(filterDto, user);
  }

  async getSeasonById(id: string, user: User): Promise<Season> {
    try {
      const found = await this.seasonsRepository.findOne({ where: { id, user } });
      if (!found) {
        throw new NotFoundException(`Season with ID "${id}" not found`);
      }
      return found;
    } catch (e) {
      throw new NotFoundException(`Season with ID "${id}" not found`);
    }
  }

  createSeason(createSeasonDto: CreateSeasonDto, user: User): Promise<Season> {
    return this.seasonsRepository.createSeason(createSeasonDto, user);
  }

  async deleteSeason(id: string, user: User): Promise<void> {
    const result = await this.seasonsRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Season with ID "${id}" not found`);
    }
  }

  async updateSeasonStatus(
    id: string,
    status: SeasonStatus,
    user: User,
  ): Promise<Season> {
    const Season = await this.getSeasonById(id, user);

    Season.status = status;
    await this.seasonsRepository.save(Season);

    return Season;
  }
}
