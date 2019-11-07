import { Controller, Get, Param, Body, UseInterceptors, Post, Delete, Put, UseFilters, UseGuards } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyCreateDto } from './currency-create.dto';
import { Roles } from '../../utils/decorators/roles.decorator';
import { UserRole } from '../../../../shared/enums/user-role.enum';
import { CurrencyUpdateDto } from './currency-update.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/roles.guard'

@Controller('currencies')
export class CurrencyController {

    constructor(private readonly currencyService: CurrencyService) { }

    @Get()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.Admin)
    async findAll() {
        return await this.currencyService.findAll();
    }

    @Get(':code')
    async findOne(@Param('code') code: string) {
        return await this.currencyService.findByCode(code);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.Admin)
    async create(@Body() currency: CurrencyCreateDto) {
        return await this.currencyService.create(currency);
    }

    @Put(':code')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.Admin)
    async update(@Param('code') code: string, @Body() currency: CurrencyUpdateDto) {
        return await this.currencyService.updateByCode(code, currency);
    }

    @Delete(':code')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.Admin)
    async delete(@Param('code') code: string) {
        return await this.currencyService.deleteByCode(code);
    }

}
