import { HttpModule, Module } from '@nestjs/common';
import { ConsumptionService } from './consumption.service';

@Module({
  imports: [HttpModule],
  providers: [ConsumptionService],
})
export class ConsumptionModule {}
