// https://github.com/julien-sarazin/nest-playground/issues/1
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, url } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const requestId = response.get('X-Request-Id');
      const responseTime = response.get('X-Response-Time');

      //   this.logger.log(
      //     `"method": "${method}", "url": "${url}", "statusCode": "${statusCode}", "contentLength": "${contentLength}" - "userAgent": ${userAgent} "ip": "${ip}"`,
      //   );

      this.logger.log(
        {
          request: {
            ip,
            method,
            userAgent,
            url,
            body: request.body,
            params: request.params,
            query: request.query,
            headers: response.header,
          },
          response: {
            statusCode: response.statusCode,
            headers: response.header,
            requestId,
            responseTime,
          },
        },
        'AppLoggerMiddleware',
      );
    });

    next();
  }
}
