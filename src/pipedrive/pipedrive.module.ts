import { Module } from '@nestjs/common';
import { PipedriveController } from './pipedrive.controller';
import { PipedriveService } from './pipedrive.service';

@Module({
  controllers: [PipedriveController],
  providers: [PipedriveService]
})
export class PipedriveModule { }
