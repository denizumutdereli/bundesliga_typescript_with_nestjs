/*eslint-disable*/
import { User } from '../auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Fixture } from './fixtures.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { GetFixturesFilterDto } from './dto/get-fixtures-filter.dto';
import { CreateFixtureDto } from './dto/create-fixture.dto';
import { Season } from 'src/season/season.entity';

@EntityRepository(Fixture)
export class FixturesRepository extends Repository<Fixture> {

  private logger = new Logger('FixturesRepository', {});

  async getFixtures(filterDto: GetFixturesFilterDto, user: User): Promise<Fixture[]> {
    const { search } = filterDto;

    const query = this.createQueryBuilder('Fixture');
    query.where({ user });//will update!


    if (search) {
      query.andWhere(
        '(LOWER(Fixture.roundNo) LIKE LOWER(:search) OR LOWER(Fixture.matches) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const Fixtures = await query.getMany();
      return Fixtures;
    } catch (error) {
      this.logger.error(
        `Failed to get Fixtures for user/season "${user.username
        }". Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
