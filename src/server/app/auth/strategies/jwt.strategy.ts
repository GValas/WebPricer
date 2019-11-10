import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import config from '../../config/config';
import { TokenPayload } from '../interfaces/token-payload-interface';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: config.jwtOptions.ignoreExpiration,
            secretOrKey: config.jwtOptions.secretKey,
        });
    }

    // Passport automatically creates a user object, based on the value we return from the validate() method, 
    // and assigns it to the Request object as req.user

    async validate(payload: TokenPayload) {
        const token = await this.authService.validateByJwt(payload);
        return payload.email;
    }

}
