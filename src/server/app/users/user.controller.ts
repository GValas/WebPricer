import { Controller, Get, Post, Delete, Put, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { Roles } from '../utils/decorators/roles.decorator';
import { UserRole } from '../../../shared/enums/user-role.enum';
import { UserCreateDto } from './user-create.dto';
import { UserUpdateDto } from './user-update.dto';
import { AuthGuard } from '@nestjs/passport/dist';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {

    constructor(private readonly userService: UsersService) { }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.Admin)
    async findAll() {
        return await this.userService.findAll();
    }

    @Get(':email')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.Admin)
    async findByEmail(@Param('email') email: string) {
        return await this.userService.findByEmail(email);
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.Admin)
    async create(@Body() user: UserCreateDto) {
        return await this.userService.create(user);
    }

    @Delete(':email')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.Admin)
    async delete(@Param('email') email: string) {
        return await this.userService.deleteByEmail(email);
    }

    @Put(':email')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.Admin)
    async update(@Param('email') email: string, @Body() user: UserUpdateDto) {
        return await this.userService.updateByEmail(email, user);
    }

}
