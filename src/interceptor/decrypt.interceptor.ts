import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
// import { RsaDecryptPublic } from '../utils/rsa';
import { decryptAES } from '../utils/aes';
// import { parseJSON } from '../utils/json';
import log4j from '../utils/log4j';
import { fail } from '../utils/responseFormat';

@Injectable()
export class DecryptInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (process.env.NODE_ENV !== 'development') {
      const req = context.switchToHttp().getRequest();
      const requestData = req.body.requestdata;

      try {
        log4j.i('decryptAES requestData:', requestData);
        const rst = JSON.parse(decryptAES(requestData));
        log4j.i('decryptAES result:', JSON.stringify(rst));
        req.body = rst || requestData;
        return next.handle();
      } catch (err) {
        log4j.e('decryptAES error:', err);
        return of(fail(HttpStatus.BAD_REQUEST));
      }
    } else {
      return next.handle();
    }
  }
}
