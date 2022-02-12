/*eslint-disable*/
import { User } from '../auth/user.entity';
import { EntityRepository, getConnection, QueryFailedError, Repository } from 'typeorm';
import { CreateSeasonDto } from './dto/create-season.dto';
import { GetSeasonsFilterDto } from './dto/get-seasons-filter.dto';
import { SeasonStatus } from './season.status.enum';
import { Season } from './season.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { GenerateSeason } from 'src/factory/generators/generate.seasons';
import { Team } from 'src/teams/team.entity';
import { Fixture } from 'src/fixtures/fixtures.entity';

@EntityRepository(Season)
export class SeasonsRepository extends Repository<Season> {
  private logger = new Logger('SeasonsRepository', {});

  async getSeasons(filterDto: GetSeasonsFilterDto, user: User): Promise<Season[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('Season');
    query.where({ user });

    if (status) {
      query.andWhere('Season.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(Season.title) LIKE LOWER(:search) OR LOWER(Season.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const Seasons = await query.getMany();
      return Seasons;
    } catch (error) {
      this.logger.error(
        `Failed to get Seasons for user "${user.username
        }". Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createSeason(createSeasonDto: CreateSeasonDto, user: User): Promise<any> {

    const { name, yearStart, yearEnd, numberOfTeams, teams, fixture } = new GenerateSeason(createSeasonDto);

    let SeasonEntity = {
      name,
      yearStart,
      yearEnd,
      numberOfTeams,
      teams,
      fixture,
      status: SeasonStatus.KICKOFF, //game started!!
      user,
    }
    const Season = this.create(SeasonEntity);

    const season = await this.insert(Season);

    try {
      //proccess
      teams.map(team => { team.userId = user.id; team.seasonId = season.raw[0].id });

      SeasonEntity.teams = teams;

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Team)
        .values(teams)
        .execute();

      fixture.map(async (x) => {

        x[0].userId = user.id;
        x[0].seasonId = season.raw[0].id;
 
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Fixture)
          .values(x)
          .printSql()
          .execute();
      });
      return Season;
    } catch (e) {
      throw new InternalServerErrorException('Team chain creation..', e);
    }

  }

}
