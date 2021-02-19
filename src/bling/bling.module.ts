import { Module } from '@nestjs/common';
import { BlingController } from './bling.controller';

@Module({
  controllers: [BlingController]
})
export class BlingModule {}
