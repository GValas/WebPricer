import { Controller, Get, Param, Body, UseInterceptors, Post, Delete, Put } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './create-currency-dto';
import { Roles } from '../../utils/roles.decorator';
import { UserRole } from '../../users/user-role.enum';

@Roles(UserRole.User)
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

    @Roles(UserRole.Admin)
    @Post()
    async create(@Body() currency: CreateCurrencyDto) {
        return await this.currencyService.create(currency);
    }

    @Roles(UserRole.Admin)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.currencyService.delete(id);
    }

    @Roles(UserRole.Admin)
    @Put(':id')
    async update(@Param('id') id: string, @Body() article: CreateCurrencyDto) {
        return await this.currencyService.update(id, article);
    }

}
