import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import config from '../config/config'
import { UsersService } from '../users/user.service'
import { ITokenPayload } from './interfaces/token-payload-interface'
import { UserLoginDto } from './user-login.dto'

const logger: Logger = new Logger('AuthService')

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

    async validateByPassword(email: string, password: string) {
        return await this.validate(email, password)
    }

    async validateByJwt(payload: ITokenPayload) {
        return await this.validate(payload.email)
    }

    private async validate(email: string, password?: string) {
        logger.log(`validateByPassword for user ${email}`)
        const user = await this.usersService.findByEmail(email)

        // user is in db
        if (!user) {
            throw new UnauthorizedException(`User ${email} is not authrorized`)
        }

        // use has pass if required
        if (password && !(await compare(password, user.password))) {
            throw new UnauthorizedException(`User ${email} is not authrorized`)
        }

        // create new token
        const payload: ITokenPayload = {
            email,
            createAt: new Date().toISOString()
        }

        return this.jwtService.sign(payload)
    }
}
