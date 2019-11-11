import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { BlackScholes } from '../../../shared/helpers/blackscholes';

@Module({

    providers: [EventsGateway, BlackScholes],
})
export class EventsModule { }