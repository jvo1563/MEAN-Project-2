import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  generateJwt(payload) {
    return this.jwtService.sign(payload);
  }

  async signIn(user) {
    console.log(`Signing in user with email: ${user.email}`);
    if (!user) throw new BadRequestException('Invalid credentials');

    const userExists = await this.findUserByEmail(user.email);
    if (!userExists) return this.registerUser(user);

    console.log('User already exist');
    return this.generateJwt({
      sub: userExists.id,
      email: userExists.email,
      first_name: userExists.first_name,
      last_name: userExists.last_name,
      picture: userExists.picture,
      role: userExists.role,
    });
  }

  async registerUser(user: User) {
    try {
      const newUser = this.userRepository.create(user);
      console.log('Creating new User: ', newUser);
      await this.userRepository.save(newUser);
      return this.generateJwt({
        sub: newUser.id,
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        picture: newUser.picture,
        role: newUser.role,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user) return null;
    return user;
  }
}
