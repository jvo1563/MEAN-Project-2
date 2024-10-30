import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
require('dotenv').config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    // console.log(`profile: ${JSON.stringify(profile)}`);
    const { provider, id, name, emails, photos } = profile;

    const user = {
      provider: provider,
      providerId: id,
      email: emails[0].value,
      first_name: name.givenName,
      last_name: name.familyName,
      picture: photos[0].value,
    };

    done(null, user);
  }
}
