import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  // Get all users
  async getAllUsers(): Promise<User[]> {
    return await this.repo.find({
      relations: ['created_reports', 'assigned_reports'],
    });
  }

  // Get user by ID
  async getUserById(id: number): Promise<User> {
    return this.repo
      .findOne({
        where: { id },
        relations: ['created_reports', 'assigned_reports'],
        // loadEagerRelations: false,
      })
      .then((user) => {
        if (!user)
          throw new RpcException({
            status: HttpStatus.NOT_FOUND,
            message: 'User not found',
          });
        return user;
      })
      .catch((error) => {
        if (error instanceof RpcException) throw error;
        // If given ID param is invalid (not a number)
        if (error.code == '22P02')
          throw new RpcException({
            status: HttpStatus.BAD_REQUEST,
            message: 'Invalid ID',
          });
        // Unexpected Error
        throw new RpcException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error,
        });
      });
  }

  // Create new user
  async createUser(user: User): Promise<User> {
    delete user.id;
    return this.repo
      .save(user)
      .then((newUser) => {
        return newUser;
      })
      .catch((error) => {
        // If user already exists
        if (error.code == '23505')
          throw new RpcException({
            status: HttpStatus.CONFLICT,
            message: 'Email already exists',
          });
        // If request is missing required fields to create
        if (error.code == '23502')
          throw new RpcException({
            status: HttpStatus.BAD_REQUEST,
            message: 'Missing required fields',
          });
        // Unexpected Error
        throw new RpcException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error,
        });
      });
  }

  // Update a user
  async updateUser(id: number, updatedUser: User): Promise<User> {
    // Prevent changing ID
    if (updatedUser.id && updatedUser.id != id)
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Cannot change ID',
      });

    // Update user if they exist
    return this.repo
      .findOne({ where: { id } })
      .then((user) => {
        if (!user)
          throw new RpcException({
            status: HttpStatus.NOT_FOUND,
            message: 'User not found',
          });
        return this.repo.save({ ...user, ...updatedUser });
      })
      .catch((error) => {
        if (error instanceof RpcException) throw error;
        if (error.code == '22P02')
          throw new RpcException({
            status: HttpStatus.BAD_REQUEST,
            message: 'Invalid ID',
          });
        // If updating to a username that already exists
        if (error.code == '23505')
          throw new RpcException({
            status: HttpStatus.CONFLICT,
            message: 'Email already exists',
          });
        // Unexpected Error
        throw new RpcException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error,
        });
      });
  }

  // Deleting a user
  async deleteUser(id: number) {
    return this.repo.delete(id).catch((error) => {
      // If given ID param is invalid (not a number)
      if (error.code == '22P02')
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: 'Invalid ID',
        });
      // Unexpected Error
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      });
    });
  }
}
