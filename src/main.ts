import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as responseTime from 'response-time';
import * as rateLimit from 'express-rate-limit';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { addRequestId } from './utils/middleware';
import { AllExceptionsFilter } from './exception/all.exceptions';
import { DecryptInterceptor } from './interceptor/decrypt.interceptor';
// import { IpWhiteListInterceptor } from './interceptor/ipWhiteList.interceptor';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { winstonLogger } from './utils/winston';

(async function () {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: winstonLogger,
  });
  app.use(
    rateLimit({
      windowMs: 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  // app.useGlobalInterceptors(new IpWhiteListInterceptor());

  // // 如果为 true，那么客户机的 IP 地址将用作 X-Forwarded-* 头中最左侧的条目。
  // // 如果为 false， 那么该应用程序将被视为直接面对因特网，
  // app.set('trust proxy', true);

  // todo 修改外拦截器模式
  app.use(responseTime());
  app.use(addRequestId);
  app.use(compression());

  if (process.env.NODE_ENV !== 'development') {
    app.useGlobalInterceptors(new DecryptInterceptor());
  }

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  // swagger
  setupSwagger(app);
  const port = process.env.SERVER_PORT || 10001;
  await app.listen(port);
  console.log(
    `🎉🎉🎉 >>>>> server running on [http://127.0.0.1:${port}] env is [${process.env.NODE_ENV}] pid is [${process.pid}] <<<<< 🎉🎉🎉`,
  );
})();
