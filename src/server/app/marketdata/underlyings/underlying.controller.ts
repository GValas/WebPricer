import { Controller, Param, Get, UseGuards, Post, Put, Body, Delete } from '@nestjs/common';
import { UnderlyingService } from './underlying.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/roles.guard';
import { UserRole } from '../../../../shared/enums/user-role.enum';
import { Roles } from '../../utils/decorators/roles.decorator';
import { UnderlyingCreateDto } from './underlying-create.dto';
import { UnderlyingUpdateDto } from './underlying-update.dto';

@Controller('underlyings')
export class UnderlyingController {

  constructor(private readonly underlyingService: UnderlyingService) { }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.User, UserRole.Admin)
  async findAll() {
    return await this.underlyingService.findAll();
  }

  @Get(':code')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.User, UserRole.Admin)
  async findOne(@Param('code') code: string) {
    return await this.underlyingService.findByCode(code);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Admin)
  async create(@Body() underlying: UnderlyingCreateDto) {
    return await this.underlyingService.create(underlying);
  }

  @Put(':code')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Admin)
  async update(@Param('code') code: string, @Body() underlying: UnderlyingUpdateDto) {
    return await this.underlyingService.updateByCode(code, underlying);
  }

  @Delete(':code')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Admin)
  async delete(@Param('code') code: string) {
    return await this.underlyingService.deleteByCode(code);
  }

}
