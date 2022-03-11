import { RemainingBalanceBodyDto } from './body.dto';
import { RemainingBalanceHeaderDto } from './header.dto';

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';

class BaseRemainingBalanceReqDto {}

export class RemainingBalanceReqDto extends BaseRemainingBalanceReqDto {
  @ApiProperty({
    description: 'body 参数三选一',
    type: () => RemainingBalanceBodyDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  body: RemainingBalanceBodyDto[];

  @ApiProperty({
    description: 'head参数',
    type: () => RemainingBalanceHeaderDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  head: RemainingBalanceHeaderDto[];
}
