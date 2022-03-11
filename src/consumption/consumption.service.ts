import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class ConsumptionService {
  constructor(private httpService: HttpService) {}
  async deduction(body) {
    return await this.httpService
      .post(process.env.CARD_SERVER_URL, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .toPromise();
  }
}
