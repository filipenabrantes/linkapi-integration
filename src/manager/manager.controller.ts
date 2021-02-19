import { Controller, Get } from '@nestjs/common';
import { BlingService } from 'src/bling/bling.service';
import { PipedriveService } from 'src/pipedrive/pipedrive.service';

@Controller('manager')
export class ManagerController {
  constructor
    (
      private readonly pipedriveService: PipedriveService,
      private readonly blingService: BlingService,
  ) { }

  @Get()
  async PipedriveToBling() {

  }

}
