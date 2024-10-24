import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  // Get all users
  async getAllUsers(): Promise<User[]> {
    return await this.repo.find();
  }

  // Get user by ID
  async getUserById(id: number): Promise<User> {
    return this.repo
      .findOne({ where: { id } })
      .then((user) => {
        if (!user)
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        return user;
      })
      .catch((error) => {
        // If given ID param is invalid (not a number)
        if (error.code == '22P02')
          throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
        // Throw 404 again
        throw error;
      });
  }

  // Create new user
  async createUser(user: User): Promise<User> {
    delete user.id;
    return this.repo
      .save(user)
      .then((user) => {
        return user;
      })
      .catch((error) => {
        // If user already exists
        if (error.code == '23505')
          throw new HttpException(
            'Username already exists',
            HttpStatus.CONFLICT,
          );
        // If request is missing required fields to create
        if (error.code == '23502')
          throw new HttpException(
            'Missing required fields',
            HttpStatus.BAD_REQUEST,
          );
        // Unexpected Error
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  // Update a user
  async updateUser(id: number, updatedUser: User): Promise<User> {
    // Prevent changing ID
    if (updatedUser.id && updatedUser.id != id)
      throw new HttpException('Cannot change ID', HttpStatus.BAD_REQUEST);

    // Update user if they exist
    return this.repo
      .findOne({ where: { id } })
      .then((user) => {
        if (!user)
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        return this.repo.save({ ...user, ...updatedUser });
      })
      .catch((error) => {
        // If updating to a username that already exists
        if (error.code == '23505')
          throw new HttpException(
            'Username already exists',
            HttpStatus.CONFLICT,
          );
        // Throw 404 again
        throw error;
      });
  }

  // Deleting a user
  async deleteUser(id: number) {
    return this.repo.delete(id).catch((error) => {
      // If given ID param is invalid (not a number)
      if (error.code == '22P02')
        throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
      // Unexpected Error
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }
}
