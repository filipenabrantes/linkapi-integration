import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDeal } from './interfaces/deals.interface';
import { AxiosRequestConfig } from 'axios'

@Injectable()
export class PipedriveService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService) { }

  async getDeals(): Promise<any> {
    const options: AxiosRequestConfig = {
      params: {
        api_token: this.configService.get('PIPEDRIVE_TOKEN'),
        status: 'won',
      }
    };

    const {
      data: {
        data: data
      }
    } = await this.httpService.get(`${this.configService.get('PIPEDRIVE_URL')}/deals`, options).toPromise();

    if (data) {
      const deals: IDeal = data.map((deal: any) => {
        return {
          id: deal.id,
          title: deal.title,
          value: deal.value,
          name: deal.person_id.name
        }
      });
      return deals;
    }
  }
}
