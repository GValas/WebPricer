import { Injectable, NotFoundException, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './user-login.dto';
import { TokenPayload } from './interfaces/token-payload-interface';
import { compare } from 'bcrypt';
import config from '../config/config';

const logger: Logger = new Logger('AuthService');

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService) { }

    async validateByPassword(email: string, password: string) {
        return await this.validate(email, password);
    }

    async validateByJwt(payload: TokenPayload) {
        return await this.validate(payload.email);
    }

    private async validate(email: string, password?: string) {

        logger.log(`validateByPassword for user ${email}`);
        const user = await this.usersService.findByEmail(email);

        // user is in db
        if (!user) {
            throw new UnauthorizedException(`User ${email} is not authrorized`);
        }

        // use has pass if required
        if (password && !await compare(password, user.password)) {
            throw new UnauthorizedException(`User ${email} is not authrorized`);
        }

        // create new token
        const payload: TokenPayload = {
            email,
            createAt: new Date().toISOString(),
        };

        return this.jwtService.sign(payload);
    }

}
