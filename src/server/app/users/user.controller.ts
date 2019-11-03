import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { UsersService } from './user.service';
import { Roles } from '../utils/decorators/roles.decorator';
import { UserRole } from '../../../shared/enums/user-role.enum';
import { UserCreateDto } from './user-create.dto';
import { UserUpdateDto } from './user-update.dto';

@Controller('users')
export class UserController {

    constructor(private readonly userService: UsersService) { }

    @Get()
    async findAll() {
        return await this.userService.findAll();
    }

    @Get(':email')
    async findByEmail(@Param('email') email: string) {
        return await this.userService.findByEmail(email);
    }

    @Post()
    @Roles(UserRole.Admin)
    async create(@Body() user: UserCreateDto) {
        return await this.userService.create(user);
    }

    @Delete(':email')
    @Roles(UserRole.Admin)
    async delete(@Param('email') email: string) {
        return await this.userService.deleteByEmail(email);
    }

    @Put(':email')
    @Roles(UserRole.Admin)
    async update(@Param('email') email: string, @Body() user: UserUpdateDto) {
        return await this.userService.updateByEmail(email, user);
    }

}
