import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './user-login.dto';

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

        const payload = {
            createAt: new Date().toISOString(),
            sub: foundUser._id,
            role: 'user',
        };

        if (foundUser.email === 'admin@admin') {
            payload.role = 'admin';
        }

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(username: string, password: string) {
        console.log('--- validateUser ---');
        const user = await this.usersService.findByEmail(username);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
