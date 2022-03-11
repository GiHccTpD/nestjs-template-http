import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { config } from '../config/configuration';
import log4j from '../utils/log4j';
const ips = config.whiteIps;

@Injectable()
export class IpWhiteListInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const reqIp = req.ip;
    if (ips.length <= 0 || !ips.includes(reqIp)) {
      log4j.e('white list:', ips);
      log4j.e('req ip not in white list:', reqIp);
      context.switchToHttp().getResponse().status(403);
      return of({ status: 403, msg: '无授权', data: {} });
    }
    return next.handle();
  }
}
