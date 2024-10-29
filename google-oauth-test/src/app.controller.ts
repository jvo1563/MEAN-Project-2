import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Roles } from './roles/roles.decorator';
import { RolesGuard } from './roles/roles.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // User needs to be logged in to see this
  @Get()
  @UseGuards(JwtAuthGuard)
  getHello(): string {
    return this.appService.getHello();
  }

  @Roles('admin') // can have multiple roles
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin')
  @UseGuards(JwtAuthGuard)
  getAdmin(): string {
    return 'Only admin users with admin role can see can see this';
  }
}
