import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ReadUserDto } from './read-user-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService) { }

    async login(user: ReadUserDto) {
        const foundUser = await this.usersService.findOne(user.email);
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
        const user = await this.usersService.findOne(username);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
