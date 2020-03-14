import { Module } from '@nestjs/common'
import { UnderlyingModule } from '../app/marketdata/underlyings/underlying.module'
import { UnderlyingService } from '../shared/services/underlying.service'
import { EventsModule } from './events/events.module'

@Module({
  imports: [EventsModule],
  providers: [UnderlyingService],
})
export class AppModule { }