import { Test, TestingModule } from '@nestjs/testing';
import { RemainingBalanceService } from './remaining-balance.service';

describe('RemainingBalanceService', () => {
  let service: RemainingBalanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemainingBalanceService],
    }).compile();

    service = module.get<RemainingBalanceService>(RemainingBalanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
