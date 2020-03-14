import { Body, Controller, Logger, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserLoginDto } from './user-login.dto'

const logger: Logger = new Logger('AuthController')

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() user: UserLoginDto) {
        logger.log(`Logging user ${JSON.stringify(user)}`)
        return {
            jwtToken: await this.authService.validateByPassword(user.email, user.password),
        }
    }

}
