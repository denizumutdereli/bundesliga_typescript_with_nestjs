/*eslint-disable*/
import { User } from '../auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Team } from './team.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { GetTeamsFilterDto } from './dto/get-teams-filter.dto';

@EntityRepository(Team)
export class TeamsRepository extends Repository<Team> {
  
  private logger = new Logger('TeamsRepository', {});

  async getTeams(filterDto: GetTeamsFilterDto, user: User): Promise<Team[]> {
    const { search } = filterDto;

    const query = this.createQueryBuilder('Team');
    query.where({ user });
 

    if (search) { //I will come here again!
      query.andWhere(
        '(LOWER(Team.teamName) LIKE LOWER(:search) OR LOWER(Team.tla) LIKE LOWER(:search) OR LOWER(Team.stadium) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const Teams = await query.getMany();
      return Teams;
    } catch (error) {
      this.logger.error(
        `Failed to get Teams for user/season "${
          user.username
        }". Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
