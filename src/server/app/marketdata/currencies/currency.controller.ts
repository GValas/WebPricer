import { Controller, Get, Param, Body, UseInterceptors, Post, Delete, Put, UseFilters } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyCreateDto } from './currency-create.dto';
import { Roles } from '../../utils/roles.decorator';
import { UserRole } from '../../users/user-role.enum';
import { CurrencyUpdateDto } from './currency-update.dto';

@Controller('currencies')
export class CurrencyController {

    constructor(private readonly currencyService: CurrencyService) { }

    @Get()
    async findAll() {
        return await this.currencyService.findAll();
    }

    @Get(':code')
    async findOne(@Param('code') code: string) {
        return await this.currencyService.findByCode(code);
    }

    @Post()
    @Roles(UserRole.Admin)
    async create(@Body() currency: CurrencyCreateDto) {
        return await this.currencyService.create(currency);
    }

    @Delete(':code')
    @Roles(UserRole.Admin)
    async delete(@Param('code') code: string) {
        return await this.currencyService.deleteByCode(code);
    }

    @Put(':code')
    @Roles(UserRole.Admin)
    async update(@Param('code') code: string, @Body() currency: CurrencyUpdateDto) {
        return await this.currencyService.updateByCode(code, currency);
    }

}
