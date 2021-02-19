import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { makeRequest } from 'src/manager/make-request';
import { IDeals } from './interfaces/deals.interface';

@Injectable()
export class PipedriveService {
  constructor(private readonly configService: ConfigService) { }

  async getDeals() {
    const params = {
      api_token: this.configService.get('PIPEDRIVE_TOKEN'),
      status: 'won',
    };

    const res = await makeRequest(`${this.configService.get('PIPEDRIVE_URL')}/deals`, 'GET', params);
    if (res.data) {
      const deals: IDeals = res.data.map((deal: any) => {
        return {
          id: deal.id,
          title: deal.title,
          value: deal.value,
          name: deal.person_id.name
        }
      });

      console.log(deals);

    }
  }
}
