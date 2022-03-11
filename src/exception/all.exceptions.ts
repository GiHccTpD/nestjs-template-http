import {
  Catch,
  Logger,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { fail } from '../utils/responseFormat';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private static readonly logger = new Logger('ExceptionsHandler');
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.status(exception.status || 500);
    // Log4j.e(exception.status || 500, exception.message, exception.stack);
    const { message, stack } = exception;
    // https://github.com/nestjs/nest/blob/master/packages/core/exceptions/external-exception-filter.ts#L8
    AllExceptionsFilter.logger.error({ message, stack });

    switch (exception.status) {
      case 400:
        response.json(
          fail(HttpStatus.BAD_REQUEST, exception.response.message.toString()),
        );
        break;
      case 404:
        response.json({
          status: exception.status,
          data: {},
          msg: exception.response.message.toString(),
        });
        break;
      case 500:
        response.json({
          status: exception.status || 500,
          data: exception,
          msg: '服务器内部错误，请稍后重试～',
        });
        break;
      default:
        response.json({
          status: exception.status || 500,
          data: exception,
          msg: '服务器内部错误，请稍后重试～',
        });
        return;
    }
  }
}
