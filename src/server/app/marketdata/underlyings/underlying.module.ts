import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UnderlyingService } from '../../../shared/services/underlying.service'
import { UnderlyingController } from './underlying.controller'
import { UnderlyingSchema } from './underlying.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Underlying', schema: UnderlyingSchema }]),
  ],
  providers: [UnderlyingService],
  controllers: [UnderlyingController],
  exports: [UnderlyingService],
})
export class UnderlyingModule { }
