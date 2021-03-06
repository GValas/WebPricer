import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { TokenExpiredError } from 'jsonwebtoken'
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    handleRequest(err, user, info: Error) {
        if (info instanceof TokenExpiredError) {
            // do stuff when token is expired
            console.log('token expired')
        }
        return user
    }

}
