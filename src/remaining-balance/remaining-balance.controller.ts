import { Body, Post, Controller, HttpStatus, Logger } from '@nestjs/common';
import { RemainingBalanceService } from './remaining-balance.service';
import { RemainingBalanceReqDto } from './dto';
import { fail, ok } from '../utils/responseFormat';
import { ApiTags, ApiHeader, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('🎯余额')
@Controller('remaining-balance')
export class RemainingBalanceController {
  constructor(
    private readonly service: RemainingBalanceService,
    private readonly logger: Logger,
  ) {}

  @Post('/get')
  @ApiHeader({
    name: 'Content-Type',
    description: 'Custom header',
    example: 'application/json',
  })
  @ApiOkResponse({ status: 200, type: String, isArray: true })
  async get(@Body() { body, head }: RemainingBalanceReqDto) {
    this.logger.log({ body, head }, 'remaining-balance body');
    try {
      const data = await this.service.get({ body, head });
      this.logger.log(data.data, 'remaining-balance return data');
      return ok(data.data);
    } catch (e) {
      this.logger.log(e, 'remaining-balance failed');
      return fail(HttpStatus.INTERNAL_SERVER_ERROR, undefined);
    }
  }
}
