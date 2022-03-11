import { Module, HttpModule } from '@nestjs/common';
import { RemainingBalanceService } from './remaining-balance.service';

@Module({
  imports: [HttpModule],
  providers: [RemainingBalanceService],
})
export class RemainingBalanceModule {}
