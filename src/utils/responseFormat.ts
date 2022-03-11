import { HttpStatus } from '@nestjs/common';

// https://github.com/nestjs/nest/blob/master/packages/common/enums/http-status.enum.ts
const httpStatusMsgObject = {};
httpStatusMsgObject[HttpStatus.OK] = 'OK';
httpStatusMsgObject[HttpStatus.CREATED] = '创建成功';
httpStatusMsgObject[HttpStatus.INTERNAL_SERVER_ERROR] =
  '服务器内部错误，请稍后重试～';
httpStatusMsgObject[HttpStatus.BAD_REQUEST] = '参数错误/解码失败';
httpStatusMsgObject[HttpStatus.UNAUTHORIZED] = '未授权';
httpStatusMsgObject[HttpStatus.NOT_FOUND] = '数据不存在';
httpStatusMsgObject[HttpStatus.FORBIDDEN] = '禁止操作';

export function ok(data: any = null, options: any = {}) {
  return Object.assign(
    {
      status: HttpStatus.OK,
      data,
      msg: httpStatusMsgObject[HttpStatus.OK],
    },
    options,
  );
}

export function fail(
  code = HttpStatus.INTERNAL_SERVER_ERROR,
  message: any = null,
) {
  return {
    status: code,
    daa: {},
    msg: message || httpStatusMsgObject[code],
  };
}
