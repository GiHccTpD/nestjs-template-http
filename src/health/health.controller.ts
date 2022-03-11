import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('🏠健康')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOkResponse({ status: 200, type: String, isArray: false })
  check() {
    return this.health.check([
      () => this.http.pingCheck('baidu', 'https://baidu.com'),
    ]);
  }
}
