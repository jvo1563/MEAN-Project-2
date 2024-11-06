import { Controller, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../models/user';
import { DeleteResult } from 'typeorm';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @MessagePattern('getAllUser')
  getAllUsers(): Promise<User[]> {
    return this.service.getAllUsers();
  }

  @MessagePattern('getUserById')
  @HttpCode(200)
  getUserById(@Payload() id: number): Promise<User> {
    return this.service.getUserById(id);
  }

  @MessagePattern('createUser')
  @HttpCode(201)
  createUser(@Payload() user: User): Promise<User> {
    return this.service.createUser(user);
  }

  @MessagePattern('updateUser')
  @HttpCode(200)
  updateUser(@Payload() payload: Object): Promise<User> {
    const id: number = payload['id'];
    const updatedUser: User = payload['updatedUser'];
    return this.service.updateUser(id, updatedUser);
  }

  @MessagePattern('deleteUser')
  @HttpCode(204)
  deleteUser(@Payload() id: number): Promise<DeleteResult> {
    return this.service.deleteUser(id);
  }
}
