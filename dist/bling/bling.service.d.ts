import { HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDeal } from 'src/pipedrive/interfaces/deals.interface';
import { RedisService } from 'nestjs-redis';
export declare class BlingService {
    private readonly configService;
    private readonly httpService;
    private readonly redisService;
    constructor(configService: ConfigService, httpService: HttpService, redisService: RedisService);
    insertOrder(deal: IDeal): Promise<any>;
}
