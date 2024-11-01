import {
  Controller,
  Get,
  Req,
  Res,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './google-oauth.guard';
import { Response, Request } from 'express';
require('dotenv').config();

@SetMetadata('isPublic', true)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Used to redirect user to Google OAuth
  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async auth() {}

  // Gets information from Google OAuth and logs user in
  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    const token = await this.authService.signIn(req.user);
    console.log(`Token created: ${token}`);

    // Redirect with token as query parameter
    return res.redirect(
      `${process.env.FRONTEND_URL}/auth-callback?token=${token}`,
    );
  }
}
