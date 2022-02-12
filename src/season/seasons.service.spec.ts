import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { SeasonStatus } from './season-status.enum';
import { SeasonsRepository } from './seasons.repository';
import { SeasonsService } from './season.service';

const mockSeasonsRepository = () => ({
  getSeasons: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'Ariel',
  id: 'someId',
  password: 'somePassword',
  seasons: [],
};

describe('SeasonService', () => {
  let seasonService: SeasonsService;
  let seasonsRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SeasonsService,
        { provide: SeasonsRepository, useFactory: mockSeasonsRepository },
      ],
    }).compile();

    seasonService = module.get(SeasonsService);
    seasonsRepository = module.get(SeasonsRepository);
  });

  describe('getSeasons', () => {
    it('calls SeasonsRepository.getSeasons and returns the result', async () => {
      seasonsRepository.getSeasons.mockResolvedValue('someValue');
      const result = await seasonService.getSeasons(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });

  describe('getSeasonById', () => {
    it('calls SeasonsRepository.findOne and returns the result', async () => {
      const mockSeason = {
        title: 'Test title',
        description: 'Test desc',
        id: 'someId',
        status: SeasonStatus.KICKOFF,
      };

      seasonsRepository.findOne.mockResolvedValue(mockSeason);
      const result = await seasonService.getSeasonById('someId', mockUser);
      expect(result).toEqual(mockSeason);
    });

    it('calls SeasonsRepository.findOne and handles an error', async () => {
      seasonsRepository.findOne.mockResolvedValue(null);
      expect(seasonService.getSeasonById('someId', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
