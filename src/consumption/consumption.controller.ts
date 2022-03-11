import { Body, Controller, Post, HttpStatus, Logger } from '@nestjs/common';
import { ConsumptionService } from './consumption.service';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ConsumptionReqDto } from './dto';
import { fail, ok } from '../utils/responseFormat';

@ApiTags('🥨消费扣款')
@Controller('consumption')
export class ConsumptionController {
  constructor(
    private readonly service: ConsumptionService,
    private readonly logger: Logger,
  ) {}

  @Post('/deduction')
  @ApiHeader({
    name: 'Content-Type',
    description: 'Custom header',
    example: 'application/json',
  })
  @ApiOkResponse({ status: 200, type: String, isArray: true })
  async deduction(@Body() { body, head }: ConsumptionReqDto) {
    this.logger.log({ body, head }, 'deduction body');
    try {
      const data = await this.service.deduction({ body, head });
      this.logger.log(data.data, 'deduction return data');
      return ok(data.data);
    } catch (e) {
      this.logger.log(e, 'deduction failed');
      return fail(HttpStatus.INTERNAL_SERVER_ERROR, undefined);
    }
  }
}
