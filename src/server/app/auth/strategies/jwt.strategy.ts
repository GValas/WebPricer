import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import config from '../../config/config';
import { TokenPayload } from '../interfaces/token-payload-interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: config.jwtOptions.ignoreExpiration,
            secretOrKey: config.jwtOptions.secretKey,
        });
    }

    async validate(payload: TokenPayload) {
        return payload.username;
    }

}
