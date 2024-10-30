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

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async auth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    // console.log(
    //   `From callback controller req.user: ${JSON.stringify(req.user)}`,
    // );
    const token = await this.authService.signIn(req.user);
    console.log(`Token created: ${token}`);

    // Redirect with token as query parameter
    return res.redirect(`http://localhost:4200/auth-callback?token=${token}`);
  }
}
