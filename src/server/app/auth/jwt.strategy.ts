import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import config from '../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
            ignoreExpiration: false,
            secretOrKey: config.secretKey,
        });
        console.log('--- jwt ---');
    }

    async validate(payload: any) {
        console.log('--- jwt --- validate ---');
        return {
            userId: payload.sub,
            username: payload.username,
            extraDataForFun: 'can you see me ?',
        };
    }

}
