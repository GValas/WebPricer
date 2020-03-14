import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UserRole } from '../../../../shared/enums/user-role.enum'
import { UnderlyingService } from '../../../shared/services/underlying.service'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { RolesGuard } from '../../auth/roles.guard'
import { Roles } from '../../utils/decorators/roles.decorator'
import { UnderlyingCreateDto } from './underlying-create.dto'
import { UnderlyingUpdateDto } from './underlying-update.dto'

@Controller('underlyings')
export class UnderlyingController {

  constructor(private readonly underlyingService: UnderlyingService) { }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.User, UserRole.Admin)
  async findAll() {
    return await this.underlyingService.findAll()
  }

  @Get(':code')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.User, UserRole.Admin)
  async findOne(@Param('code') code: string) {
    return await this.underlyingService.findByCode(code)
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  async createOne(@Body() underlying: UnderlyingCreateDto) {
    return await this.underlyingService.createOne(underlying)
  }

  @Put(':code')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  async update(@Param('code') code: string, @Body() underlying: UnderlyingUpdateDto) {
    return await this.underlyingService.updateByCode(code, underlying)
  }

  @Delete(':code')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  async delete(@Param('code') code: string) {
    return await this.underlyingService.deleteByCode(code)
  }

}
