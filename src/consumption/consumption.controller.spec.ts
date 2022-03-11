import { Test, TestingModule } from '@nestjs/testing';
import { ConsumptionController } from './consumption.controller';

describe('ConsumptionController', () => {
  let controller: ConsumptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumptionController],
    }).compile();

    controller = module.get<ConsumptionController>(ConsumptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
