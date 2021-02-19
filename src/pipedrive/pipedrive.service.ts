import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { makeRequest } from 'src/manager/make-request';

@Injectable()
export class PipedriveService {
  constructor(private readonly configService: ConfigService) { }

  async getDeals() {
    const params = {
      api_token: this.configService.get('PIPEDRIVE_TOKEN'),
      status: 'won',
    };

    const res = await makeRequest(`${this.configService.get('PIPEDRIVE_URL')}/deals`, 'GET', params);
    console.log(res)
  }
}
