import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UnderlyingSchema } from '../../app/marketdata/underlyings/underlying.schema'
import { UnderlyingService } from '../../shared/services/underlying.service'
import { EventsGateway } from './events.gateway'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Underlying', schema: UnderlyingSchema }]),
    ],
    providers: [EventsGateway, UnderlyingService],
})
export class EventsModule { }
