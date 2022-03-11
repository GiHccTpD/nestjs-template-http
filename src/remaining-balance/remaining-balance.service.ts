import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class RemainingBalanceService {
  constructor(private httpService: HttpService) {}
  async get(body) {
    const res = await this.httpService
      .post(process.env.CARD_SERVER_URL, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .toPromise();
    return res;
  }
}
