import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  @HttpCode(200)
  getAllUser(): Promise<any[]> {
    return this.service.getAllUser();
  }

  @Get(':id')
  @HttpCode(200)
  getUserById(@Param('id') id: number): Promise<any> {
    return this.service.getUserById(id);
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() user: any): Promise<any> {
    return this.service.createUser(user);
  }

  @Put(':id')
  @HttpCode(200)
  updateUser(@Param('id') id: number, @Body() user: any): Promise<any> {
    return this.service.updateUser(id, user);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: number): Promise<void> {
    return this.service.deleteUser(id);
  }
}
