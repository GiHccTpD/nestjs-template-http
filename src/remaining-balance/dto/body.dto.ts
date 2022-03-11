import { ApiProperty } from '@nestjs/swagger';
import { MinLength, MaxLength, IsString } from 'class-validator';
import { BaseBodyDto } from '../../dto/BaseBody.dto';

export class RemainingBalanceBodyDto extends BaseBodyDto {
  @ApiProperty({
    description: '手机号码',
  })
  @IsString()
  @MinLength(0, {
    message: 'phonenumber is too short',
  })
  @MaxLength(11, {
    message: 'phonenumber is too long',
  })
  phonenumber?: string;

  @ApiProperty({
    description: '人员编号',
  })
  @IsString()
  @MinLength(0, {
    message: 'perno is too short',
  })
  @MaxLength(19, {
    message: 'perno is too long',
  })
  perno?: string;

  @ApiProperty({
    description: '卡号',
  })
  @IsString()
  @MinLength(0, {
    message: 'cardno is too short',
  })
  cardno?: string;
}
