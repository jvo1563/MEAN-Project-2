import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user';
require('dotenv').config();

export type JwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    // const extractJwtFromCookie = (req) => {
    //   let token = null;
    //   if (req && req.cookies) {
    //     token = req.cookies['access_token'];
    //   }
    //   return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    // };
    super({
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //extractJwtFromCookie,
    });
  }

  async validate(payload: JwtPayload) {
    console.log(`Payload from JWT Strategy: ${JSON.stringify(payload)}`);
    const user = await this.userRepository.findOne({
      where: { id: parseInt(payload.sub) },
    });

    if (!user) throw new UnauthorizedException('Please log in to continue');
    const test = {
      id: payload.sub,
      email: payload.email,
      role: user.role,
    };
    console.log(`Returning ${JSON.stringify(test)}`);
    return {
      id: payload.sub,
      email: payload.email,
      role: user.role,
    };
  }
}
