/*eslint-disable*/
import { User } from '../auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateMatchDto } from './dto/create-match.dto';
import { GetMatchsFilterDto } from './dto/get-matchs-filter.dto';
import { MatchStatus } from './match-status.enum';
import { Match } from './match.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Match)
export class MatchsRepository extends Repository<Match> {
  private logger = new Logger('MatchsRepository', {});

  async getMatchs(filterDto: GetMatchsFilterDto, user: User): Promise<Match[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('Match');
    query.where({ user });

    if (status) {
      query.andWhere('Match.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(Match.title) LIKE LOWER(:search) OR LOWER(Match.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const Matchs = await query.getMany();
      return Matchs;
    } catch (error) {
      this.logger.error(
        `Failed to get Matchs for user "${
          user.username
        }". Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createMatch(createMatchDto: CreateMatchDto, user: User): Promise<Match> {
    const { title, description } = createMatchDto;

    const Match = this.create({
      title,
      description,
      status: MatchStatus.KICKOFF, //game started!!
      user,
    });

    await this.save(Match);
    return Match;
  }
}
