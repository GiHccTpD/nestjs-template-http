import { ApiProperty } from '@nestjs/swagger';
import {
  MinLength,
  MaxLength,
  IsString,
  Matches,
  IsNotEmpty,
} from 'class-validator';
import { BaseBodyDto } from '../../dto/BaseBody.dto';

export class ConsumptionBodyDto extends BaseBodyDto {
  @ApiProperty({
    description: '卡号',
  })
  @IsString()
  @MinLength(0, {
    message: 'cardno is too short',
  })
  @IsNotEmpty()
  cardno: string;

  @ApiProperty({
    description: '消费金额',
  })
  @IsString()
  @MinLength(0, {
    message: 'money is too short',
  })
  @IsNotEmpty()
  money: string;

  @ApiProperty({
    description: '交易日期, YYYYMMDD',
    example: '20210706',
  })
  @IsString()
  @Matches(
    /(?<!\d)(?:(?:(?:1[6-9]|[2-9]\d)?\d{2})(?:(?:(?:0[13578]|1[02])31)|(?:(?:0[1,3-9]|1[0-2])(?:29|30)))|(?:(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))0229)|(?:(?:1[6-9]|[2-9]\d)?\d{2})(?:(?:0?[1-9])|(?:1[0-2]))(?:0?[1-9]|1\d|2[0-8]))(?!\d)/,
    {
      message: '日期不正确',
    },
  )
  @MinLength(8, {
    message: '交易日期',
  })
  date: string;

  @ApiProperty({
    description: '交易时间, hhmmss',
    example: '092300',
  })
  @IsString()
  @MinLength(6, {
    message: '交易时间',
  })
  time: string;

  @ApiProperty({
    description: '备注',
  })
  @MaxLength(15, {
    message: 'remark is too long',
  })
  @IsString()
  remark?: string;

  @ApiProperty({
    description: '类型 2：消费',
    default: 2,
  })
  @IsNotEmpty()
  type: number;

  @ApiProperty({
    description: '前端 默认：3',
    default: 3,
  })
  @IsNotEmpty()
  system: number;

  @ApiProperty({
    description: '扣款订单号',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(0, {
    message: 'uid is too short',
  })
  @MaxLength(15, {
    message: 'uid is too long',
  })
  @MaxLength(30, {
    message: '扣款订单号 唯一',
  })
  uid: string;
}
