import { ConsumptionBodyDto } from './body.dto';
import { ConsumptionHeaderDto } from './header.dto';

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';

class BaseConsumptionReqDto {}

export class ConsumptionReqDto extends BaseConsumptionReqDto {
  @ApiProperty({
    description: 'body 参数三选一',
    type: () => ConsumptionBodyDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  body: ConsumptionBodyDto[];

  @ApiProperty({
    description: 'head参数',
    type: () => ConsumptionHeaderDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  head: ConsumptionHeaderDto[];
}
