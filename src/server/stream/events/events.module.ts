import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { BlackScholes } from '../../../shared/helpers/blackscholes';
import { UnderlyingService } from '../../shared/services/underlying.service';
import { UnderlyingModule } from '../../app/marketdata/underlyings/underlying.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UnderlyingSchema } from '../../app/marketdata/underlyings/underlying.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Underlying', schema: UnderlyingSchema }]),
    ],
    providers: [EventsGateway, BlackScholes, UnderlyingService],
})
export class EventsModule { }