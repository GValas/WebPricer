import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from '../auth.service';

const logger: Logger = new Logger('LocalStrategy');

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(username: string, password: string) {
        const user = this.authService.validateUser(username, password);
        if (user) {
            logger.log(`User ${username} validation failed`);
            throw new UnauthorizedException();
        }
        logger.log(`Validated user ${username} successfully`);
        return user;
    }
}
