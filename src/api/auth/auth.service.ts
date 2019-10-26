import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) { }

    async validateUser(username: string, pass: string): Promise<any> {
        console.log('-------------------')

        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}