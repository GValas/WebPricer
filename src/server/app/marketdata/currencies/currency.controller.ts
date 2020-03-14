import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UserRole } from '../../../../shared/enums/user-role.enum'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { RolesGuard } from '../../auth/roles.guard'
import { Roles } from '../../utils/decorators/roles.decorator'
import { CurrencyCreateDto } from './currency-create.dto'
import { CurrencyUpdateDto } from './currency-update.dto'
import { CurrencyService } from './currency.service'

@Controller('currencies')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CurrencyController {

    constructor(private readonly currencyService: CurrencyService) { }

    @Get()
    @Roles(UserRole.User, UserRole.Admin)
    async findAll() {
        return await this.currencyService.findAll()
    }

    @Get(':code')
    @Roles(UserRole.User, UserRole.Admin)
    async findOne(@Param('code') code: string) {
        return await this.currencyService.findByCode(code)
    }

    @Post()
    @Roles(UserRole.Admin)
    async createOne(@Body() currency: CurrencyCreateDto) {
        return await this.currencyService.createOne(currency)
    }

    @Put(':code')
    @Roles(UserRole.Admin)
    async update(@Param('code') code: string, @Body() currency: CurrencyUpdateDto) {
        return await this.currencyService.updateByCode(code, currency)
    }

    @Delete(':code')
    @Roles(UserRole.Admin)
    async delete(@Param('code') code: string) {
        return await this.currencyService.deleteByCode(code)
    }

}
