import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport/dist'
import { UserRole } from '../../../shared/enums/user-role.enum'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RolesGuard } from '../auth/roles.guard'
import { Roles } from '../utils/decorators/roles.decorator'
import { UserCreateDto } from './user-create.dto'
import { UserUpdateDto } from './user-update.dto'
import { UsersService } from './user.service'

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {

    constructor(private readonly userService: UsersService) { }

    @Get()
    async findAll() {
        return await this.userService.findAll()
    }

    @Get(':email')
    async findByEmail(@Param('email') email: string) {
        return await this.userService.findByEmail(email)
    }

    @Post()
    @Roles(UserRole.Admin)
    async createOne(@Body() user: UserCreateDto) {
        return await this.userService.createOne(user)
    }

    @Delete(':email')
    async delete(@Param('email') email: string) {
        return await this.userService.deleteByEmail(email)
    }

    @Put(':email')
    async update(@Param('email') email: string, @Body() user: UserUpdateDto) {
        return await this.userService.updateByEmail(email, user)
    }

}
