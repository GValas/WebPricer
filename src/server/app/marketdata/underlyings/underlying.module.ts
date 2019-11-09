import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UnderlyingService } from './underlying.service';
import { UnderlyingController } from './underlying.controller';
import { UnderlyingSchema } from './underlying.schema';
import { UserModule } from '../../users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Underlying', schema: UnderlyingSchema }]),
    UserModule,
  ],
  providers: [UnderlyingService],
  controllers: [UnderlyingController],
  exports: [UnderlyingService],
})
export class UnderlyingModule { }
