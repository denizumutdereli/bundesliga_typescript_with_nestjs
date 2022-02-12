/*eslint-disable*/
import { Injectable, NotFoundException } from '@nestjs/common';
import { MatchStatus } from './match-status.enum';
import { CreateMatchDto } from './dto/create-match.dto';
import { GetMatchsFilterDto } from './dto/get-matchs-filter.dto';
import { MatchsRepository } from './matchs.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './match.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class MatchsService {
  constructor(
    @InjectRepository(MatchsRepository)
    private matchsRepository: MatchsRepository,
  ) { }

  getMatchs(filterDto: GetMatchsFilterDto, user: User): Promise<Match[]> {
    return this.matchsRepository.getMatchs(filterDto, user);
  }

  async getMatchById(id: string, user: User): Promise<Match> {
    try {
      const found = await this.matchsRepository.findOne({ where: { id, user } });
      if (!found) {
        throw new NotFoundException(`Match with ID "${id}" not found`);
      }
      return found;
    } catch (e) {
      throw new NotFoundException(`Match with ID "${id}" not found`);
    }
  }

  createMatch(createMatchDto: CreateMatchDto, user: User): Promise<Match> {
    return this.matchsRepository.createMatch(createMatchDto, user);
  }

  async deleteMatch(id: string, user: User): Promise<void> {
    const result = await this.matchsRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Match with ID "${id}" not found`);
    }
  }

  async updateMatchStatus(
    id: string,
    status: MatchStatus,
    user: User,
  ): Promise<Match> {
    const Match = await this.getMatchById(id, user);

    Match.status = status;
    await this.matchsRepository.save(Match);

    return Match;
  }
}
