import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './google-oauth.guard';
import { Response, Request } from 'express';
require('dotenv').config();

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async auth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    console.log(
      `From callback controller req.user: ${JSON.stringify(req.user)}`,
    );
    const token = await this.authService.signIn(req.user);
    console.log(`Token from callback: ${token}`);

    // res.cookie('token', token, {
    //   maxAge: 600000, // 10 minutes
    //   sameSite: true,
    //   secure: false,
    // });

    // return res.status(HttpStatus.OK).send();
    // Option 1: Redirect with token as query parameter
    return res.redirect(`http://localhost:4200/auth-callback?token=${token}`);

    // Option 2: Redirect with token as URL fragment (more secure)
    // return res.redirect(`http://localhost:4200/auth-callback#token=${token}`);

    // Option 3: Set cookie and redirect (if same domain)
    // res.cookie('token', token, { httpOnly: true, secure: true });
    // return res.redirect('http://localhost:4200/auth-callback');
  }
}
