import { Module } from '@nestjs/common';
import { UnderlyingService } from './underlying.service';
import { UnderlyingController } from './underlying.controller';
import { DataRepository } from '../data/data.repository';

@Module({
  providers: [UnderlyingService, DataRepository],
  controllers: [UnderlyingController],
  exports: [UnderlyingService],
})
export class UnderlyingModule { }
