import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PipedriveService } from './pipedrive/pipedrive.service';
import { BlingService } from './bling/bling.service';
import { ManagerService } from './manager/manager.service';
import { BlingModule } from './bling/bling.module';
import { ManagerModule } from './manager/manager.module';
import { PipedriveModule } from './pipedrive/pipedrive.module';

const configService = new ConfigService();
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    // MongooseModule.forRoot(configService.get('MONGO_SERVER')),
    BlingModule,
    ManagerModule,
    PipedriveModule,
  ],
  controllers: [],
  providers: [PipedriveService, BlingService, ManagerService],
})
export class AppModule { }
