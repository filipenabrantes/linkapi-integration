import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ManagerModule } from './manager/manager.module';
import { SharedModule } from './shared/shared.module';

const configService = new ConfigService();
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRoot(configService.get('MONGO_SERVER')),
    ManagerModule,
    SharedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
