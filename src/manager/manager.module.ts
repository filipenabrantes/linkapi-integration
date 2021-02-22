import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlingService } from 'src/bling/bling.service';
import { PipedriveService } from 'src/pipedrive/pipedrive.service';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
import { Order, OrderSchema } from './schema/order.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],
  controllers: [ManagerController],
  providers: [PipedriveService, BlingService, ManagerService]
})
export class ManagerModule { }
