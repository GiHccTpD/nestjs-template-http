import { Test, TestingModule } from '@nestjs/testing';
import { ConsumptionService } from './consumption.service';

describe('ConsumptionService', () => {
  let service: ConsumptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsumptionService],
    }).compile();

    service = module.get<ConsumptionService>(ConsumptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
