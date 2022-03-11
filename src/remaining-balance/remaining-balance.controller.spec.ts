import { Test, TestingModule } from '@nestjs/testing';
import { RemainingBalanceController } from './remaining-balance.controller';

describe('RemainingBalanceController', () => {
  let controller: RemainingBalanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemainingBalanceController],
    }).compile();

    controller = module.get<RemainingBalanceController>(
      RemainingBalanceController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
