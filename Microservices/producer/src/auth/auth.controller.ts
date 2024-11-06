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

  // Handles the callback from the Google OAuth flow. This endpoint is called after the user has authenticated with Google.
  // It receives the user information from Google, signs the user in, and redirects the user to the frontend with a token in the query parameter.
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
