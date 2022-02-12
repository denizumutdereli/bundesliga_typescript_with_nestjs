/*eslint-disable*/
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateMatchDto } from './dto/create-match.dto';
import { GetMatchsFilterDto } from './dto/get-matchs-filter.dto';
import { UpdateMatchStatusDto } from './dto/update-match-status.dto';
import { Match } from './match.entity';
import { MatchsService } from './matchs.service';
import { Logger,ValidationPipe } from '@nestjs/common';

@Controller('Matchs')
@UseGuards(AuthGuard())
export class MatchsController {
  private logger = new Logger('MatchsController');

  constructor(private matchsService: MatchsService) {}

  @Get()
  getMatchs(
    @Query(ValidationPipe) filterDto: GetMatchsFilterDto,
    @GetUser() user: User,
  ): Promise<Match[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all matchs. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.matchsService.getMatchs(filterDto, user);
  }

  @Get('/:id')
  getMatchById(@Param('id') id: string, @GetUser() user: User): Promise<Match> {
    return this.matchsService.getMatchById(id, user);
  }

  @Post()
  createMatch(
    @Body() createMatchDto: CreateMatchDto,
    @GetUser() user: User,
  ): Promise<Match> {
    this.logger.verbose(
      `User "${user.username}" creating a new Match. Data: ${JSON.stringify(
        createMatchDto,
      )}`,
    );
    return this.matchsService.createMatch(createMatchDto, user);
  }

  @Delete('/:id')
  deleteMatch(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.matchsService.deleteMatch(id, user);
  }

  @Patch('/:id/status')
  updateMatchStatus(
    @Param('id') id: string,
    @Body() updateMatchStatusDto: UpdateMatchStatusDto,
    @GetUser() user: User,
  ): Promise<Match> {
    const { status } = updateMatchStatusDto;
    return this.matchsService.updateMatchStatus(id, status, user);
  }
}
