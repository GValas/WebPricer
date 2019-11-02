import { Controller, Post, Body } from '@nestjs/common';
import { ReadUserDto } from './read-user-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {

    }

    @Post('login')
    async login(@Body() user: ReadUserDto) {
        return await this.authService.login(user);
    }

}
