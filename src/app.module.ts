import {
  MiddlewareConsumer,
  Module,
  HttpModule,
  Logger,
  NestModule,
} from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';
import { RemainingBalanceController } from './remaining-balance/remaining-balance.controller';
import { RemainingBalanceService } from './remaining-balance/remaining-balance.service';
import { RemainingBalanceModule } from './remaining-balance/remaining-balance.module';
import { HealthController } from './health/health.controller';
import { AppLoggerMiddleware } from './middleware/logger.middleware';

const envFilePath = `.${process.env.NODE_ENV}.env`;
@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    }),
    RemainingBalanceModule,
    TerminusModule,
  ],
  controllers: [RemainingBalanceController, HealthController],
  providers: [RemainingBalanceService, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
