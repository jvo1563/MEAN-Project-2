import { Injectable } from '@nestjs/common';
// import { User } from './user';
import { RabbitService } from 'src/rabbit/rabbit.service';

@Injectable()
export class UserService {
  constructor(private rabbitService: RabbitService) {}

  // Get all users
  async getAllUsers(): Promise<any[]> {
    return await this.rabbitService.sendToUserConsumer('getAllUsers', {});
  }

  // Get user by ID
  async getUserById(id: number): Promise<any> {
    return await this.rabbitService.sendToUserConsumer('getUserById', id);
  }

  // Create new user
  async createUser(user: any): Promise<any> {
    return await this.rabbitService.sendToUserConsumer('createUser', user);
  }

  // Update a user
  async updateUser(id: number, updatedUser: any): Promise<any> {
    return await this.rabbitService.sendToUserConsumer('updateUser', {
      id,
      updatedUser,
    });
  }

  // Deleting a user
  async deleteUser(id: number) {
    return await this.rabbitService.sendToUserConsumer('createUser', id);
  }
}
