import { Injectable } from '@nestjs/common';
// import { User } from './user';
import { RabbitService } from 'src/rabbit/rabbit.service';

@Injectable()
export class UserService {
  constructor(private rabbitService: RabbitService) {}

  // Get all users
  async getAllUser(): Promise<any[]> {
    return await this.rabbitService.sendToUserConsumer('getAllUser', {});
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

  // Delete a user
  async deleteUser(id: number): Promise<void> {
    return await this.rabbitService.sendToUserConsumer('deleteUser', id);
  }
}
