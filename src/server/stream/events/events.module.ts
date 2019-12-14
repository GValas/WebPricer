import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { UnderlyingService } from '../../shared/services/underlying.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UnderlyingSchema } from '../../app/marketdata/underlyings/underlying.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Underlying', schema: UnderlyingSchema }]),
    ],
    providers: [EventsGateway, UnderlyingService],
})
export class EventsModule { }
