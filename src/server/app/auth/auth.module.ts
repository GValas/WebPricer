import { Module, Global } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import config from '../config/config';

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
