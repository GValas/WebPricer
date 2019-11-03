import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrencySchema } from './currency.schema';
import { UsersService } from '../../users/user.service';
import { UsersModule } from '../../users/user.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Currency', schema: CurrencySchema }]),
        UsersModule,
    ],
    providers: [CurrencyService],
    controllers: [CurrencyController],
    exports: [CurrencyService],
})
export class CurrencyModule { }
