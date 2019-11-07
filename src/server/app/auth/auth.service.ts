import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './user-login.dto';
import { TokenPayload } from './interfaces/token-payload-interface';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService) { }

    async login(user: UserLoginDto) {

        const foundUser = await this.usersService.findByEmail(user.email);
        if (!foundUser || foundUser.password !== user.password) {
            throw new NotFoundException();
        }

        const payload: TokenPayload = {
            username: user.email,
            createAt: new Date().toISOString(),
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(username: string, password: string) {
        const user = await this.usersService.findByEmail(username);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
