import { Controller, Get } from '@nestjs/common';
import { PipedriveService } from './pipedrive.service';

@Controller('pipedrive')
export class PipedriveController {
  constructor(private pipedriveService: PipedriveService) { }

  @Get()
  async getDeals(): Promise<any> {
    return this.pipedriveService.getDeals();
  }

}
