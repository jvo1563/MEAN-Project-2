import { Module } from '@nestjs/common';
import { GoogleStrategy } from './google.strategy';
import { PassportModule } from '@nestjs/passport';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from '../models/user';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/user/user.service';
import { RabbitService } from 'src/rabbit/rabbit.service';
require('dotenv').config();

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    AuthService,
    JwtStrategy,
    UserService,
    RabbitService,
  ],
})
export class AuthModule {}
