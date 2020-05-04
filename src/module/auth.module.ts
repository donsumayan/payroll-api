import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from '../controller/auth.controller';
import { AuthService } from '../service/auth.service';
import { JwtStrategy } from '../utils/passport-strategies/jtw.strategy';
import { LocalStrategy } from '../utils/passport-strategies/local.strategy';
import { UserModule } from './user.module';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JwtSecret,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
