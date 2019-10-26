import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { DataRepository } from '../data/data.repository';
import { CurrencyController } from './currency.controller';

@Module({
    providers: [CurrencyService, DataRepository],
    controllers: [CurrencyController],
    exports: [CurrencyService],
})
export class CurrencyModule {}
