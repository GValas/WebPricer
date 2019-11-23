import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { UnderlyingModule } from '../app/marketdata/underlyings/underlying.module';
import { UnderlyingService } from '../shared/services/underlying.service';

@Module({
  imports: [EventsModule],
  providers: [UnderlyingService],
})
export class AppModule { }