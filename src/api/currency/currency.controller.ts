import { Controller, Get, Param } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyCode } from '../../shared/models/currency.model';

@Controller('currencies')
export class CurrencyController {

    constructor(private readonly currencyService: CurrencyService) {
    }

    @Get()
    async findAll() {
        return await this.currencyService.getAll();
    }

    @Get(':code')
    async findOne(@Param('code') code: CurrencyCode) {
        return await this.currencyService.getByCode(code);
    }
}
