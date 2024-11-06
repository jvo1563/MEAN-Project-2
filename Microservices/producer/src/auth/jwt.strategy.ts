import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
require('dotenv').config();

export type JwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UserService) {
    super({
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  /**
   * Validates the JWT payload and returns the user information.
   * @returns An object containing the user's ID, email, and role.
   */
  async validate(payload: JwtPayload) {
    const user = await this.userService.getUserById(parseInt(payload.sub));

    if (!user) throw new UnauthorizedException('Please log in to continue');
    return {
      id: payload.sub,
      email: payload.email,
      role: user.role,
    };
  }
}
