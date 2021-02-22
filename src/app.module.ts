import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { RedisModule } from 'nestjs-redis';
import { ManagerModule } from './manager/manager.module';
import { SharedModule } from './shared/shared.module';

const configService = new ConfigService();
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    ScheduleModule.forRoot(),
    RedisModule.register({
      url: `redis://${configService.get('REDIS_HOST')}:${configService.get('REDIS_PORT')}?
        db=${configService.get('REDIS_DB')}&password=${configService.get('REDIS_PASSWORD')}`
    }),
    MongooseModule.forRoot(configService.get('MONGO_SERVER')),
    ManagerModule,
    SharedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
