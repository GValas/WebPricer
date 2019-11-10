import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrencySchema } from './currency.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Currency', schema: CurrencySchema }]),
    ],
    providers: [CurrencyService],
    controllers: [CurrencyController],
    exports: [CurrencyService],
})
export class CurrencyModule { }
