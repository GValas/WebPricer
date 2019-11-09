import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './user-login.dto';
import { TokenPayload } from './interfaces/token-payload-interface';
import { compare } from 'bcrypt';

const logger: Logger = new Logger('AuthService');

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService) { }

    async login(user: UserLoginDto) {

        logger.log(`Logging user ${JSON.stringify(user)}`);
        if (!await this.validateUser(user.email, user.password)) {
            throw new NotFoundException();
        }

        const payload: TokenPayload = {
            username: user.email,
            createAt: new Date().toISOString(),
        };

        logger.log(`User logged successfully, returning token ${JSON.stringify(payload)}`);
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(username: string, password: string) {
        logger.log(`validateUser ${username} / ${password} `);
        const user = await this.usersService.findByEmail(username);
        return user && await compare(password, user.password);
    }
}
