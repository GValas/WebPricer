import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import config from '../config/config'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    JwtModule.register({
      secret: config.jwtOptions.secretKey,
      signOptions: {
        expiresIn: config.jwtOptions.tokenExpiry,
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule { }
