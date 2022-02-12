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
import { CreateSeasonDto } from './dto/create-season.dto';
import { GetSeasonsFilterDto } from './dto/get-seasons-filter.dto';
import { UpdateSeasonStatusDto } from './dto/update-season-status.dto';
import { Season } from './season.entity';
import { SeasonsService } from './season.service';
import { Logger,ValidationPipe } from '@nestjs/common';

@Controller('season')
@UseGuards(AuthGuard())
export class SeasonsController {
  private logger = new Logger('SeasonsController');

  constructor(private seasonsService: SeasonsService) {}

  @Get()
  getSeasons(
    @Query(ValidationPipe) filterDto: GetSeasonsFilterDto,
    @GetUser() user: User,
  ): Promise<Season[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all seasons. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.seasonsService.getSeasons(filterDto, user);
  }

  @Get('/:id')
  getSeasonById(@Param('id') id: string, @GetUser() user: User): Promise<Season> {
    return this.seasonsService.getSeasonById(id, user);
  }

  @Post()
  createSeason(
    @Body() createSeasonDto: CreateSeasonDto,
    @GetUser() user: User,
  ): Promise<Season> {
    this.logger.verbose(
      `User "${user.username}" creating a new Season. Data: ${JSON.stringify(
        createSeasonDto,
      )}`,
    );
    return this.seasonsService.createSeason(createSeasonDto, user);
  }

  @Delete('/:id')
  deleteSeason(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.seasonsService.deleteSeason(id, user);
  }

  @Patch('/:id/status')
  updateSeasonStatus(
    @Param('id') id: string,
    @Body() updateSeasonStatusDto: UpdateSeasonStatusDto,
    @GetUser() user: User,
  ): Promise<Season> {
    const { status } = updateSeasonStatusDto;
    return this.seasonsService.updateSeasonStatus(id, status, user);
  }
}
