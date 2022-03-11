import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Matches,
  IsNotEmpty,
  IsEnum,
  MinLength,
} from 'class-validator';

export enum McodeEnum {
  QueryConsumptionRecords = '400301',
  QueryBalance = '400302',
  Recharge = '400303',
  GetBasicBookingInformation = '400304',
  GetDishInformation = '400305',
  OrderAMeal = '400306',
  InquireLastReservation = '400307',
  DeductionsConsumption = '400308',
}

export class BaseHeaderDto {
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
    description:
      '查询消费记录\t400301\n' +
      '查询余额\t400302\n' +
      '钱包充值\t400303\n' +
      '获取订餐基础信息\t400304\n' +
      '获取菜品信息\t400305\n' +
      '订餐\t400306\n' +
      '查询最后一次订餐情况\t400307\n' +
      '扣款消费\t400308\n',
    enum: McodeEnum,
  })
  @IsNotEmpty()
  @IsEnum(McodeEnum)
  mcode: McodeEnum;

  @ApiProperty({
    description: '系统跟踪号, 当日不允许重复，即交易流水号',
    example: '1234567890987654',
  })
  @MinLength(16, {
    message: '系统跟踪号',
  })
  @IsString()
  @IsNotEmpty()
  mid: string;

  @ApiProperty({
    description:
      '报文版本, 0001：默认版本，只需要计算mac\n' + '0002：需要计算sign\n',
  })
  @MinLength(4, {
    message: '报文版本',
  })
  @IsString()
  @IsNotEmpty()
  ver: string;

  @ApiProperty({
    description:
      '报文属性' +
      '99：心跳报文\n' +
      '10：微信公众号请求的报文\n' +
      '11：返回给微信公众号的报文\n' +
      '20：移动终端请求的报文\n' +
      '21：返回给移动终端的报文\n' +
      '30：PC端请求的报文\n' +
      '31：返回给PC端的报文\n',
  })
  @MinLength(2, {
    message: '报文属性',
  })
  @IsString()
  @IsNotEmpty()
  msgatr: string;

  @ApiProperty({
    description:
      '报文安全标志' +
      '\t第1位：加密标志(0：不加密；1：加密)。\n' +
      '\t第2位：算法标志(0：不校验；1：采用MD5)。\n' +
      '默认值为：11\n',
    example: '11',
  })
  @MinLength(2, {
    message: '报文安全标志',
  })
  @IsString()
  safeflg?: string;

  @ApiProperty({
    description: '加密结果, 不定长',
  })
  @MinLength(2, {
    message: '加密结果',
  })
  @IsString()
  mac?: string;
}
