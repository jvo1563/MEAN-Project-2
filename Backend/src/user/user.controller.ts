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
import { User } from './user';
import { DeleteResult } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  @HttpCode(200)
  getAllUsers(): Promise<User[]> {
    return this.service.getAllUsers();
  }

  @Get(':id')
  @HttpCode(200)
  getUserById(@Param('id') id: number): Promise<User> {
    return this.service.getUserById(id);
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() user: User): Promise<User> {
    return this.service.createUser(user);
  }

  @Put(':id')
  @HttpCode(200)
  updateUser(@Param('id') id: number, @Body() user: User): Promise<User> {
    return this.service.updateUser(id, user);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return this.service.deleteUser(id);
  }
}
