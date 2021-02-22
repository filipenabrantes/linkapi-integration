import { HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class PipedriveService {
    private readonly configService;
    private readonly httpService;
    constructor(configService: ConfigService, httpService: HttpService);
    getDeals(): Promise<any>;
}
