import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { MatchStatus } from './match-status.enum';
import { MatchsRepository } from './matchs.repository';
import { MatchsService } from './matchs.service';

const mockMatchsRepository = () => ({
  getMatchs: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'Ariel',
  id: 'someId',
  password: 'somePassword',
  matchs: [],
};

describe('MatchsService', () => {
  let matchsService: MatchsService;
  let matchsRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MatchsService,
        { provide: MatchsRepository, useFactory: mockMatchsRepository },
      ],
    }).compile();

    matchsService = module.get(MatchsService);
    matchsRepository = module.get(MatchsRepository);
  });

  describe('getMatchs', () => {
    it('calls MatchsRepository.getMatchs and returns the result', async () => {
      matchsRepository.getMatchs.mockResolvedValue('someValue');
      const result = await matchsService.getMatchs(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });

  describe('getMatchById', () => {
    it('calls MatchsRepository.findOne and returns the result', async () => {
      const mockMatch = {
        title: 'Test title',
        description: 'Test desc',
        id: 'someId',
        status: MatchStatus.KICKOFF,
      };

      matchsRepository.findOne.mockResolvedValue(mockMatch);
      const result = await matchsService.getMatchById('someId', mockUser);
      expect(result).toEqual(mockMatch);
    });

    it('calls MatchsRepository.findOne and handles an error', async () => {
      matchsRepository.findOne.mockResolvedValue(null);
      expect(matchsService.getMatchById('someId', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
