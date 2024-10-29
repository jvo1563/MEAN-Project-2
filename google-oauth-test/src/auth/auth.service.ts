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
    console.log(`Signing in user with info: ${JSON.stringify(user)}`);
    if (!user) throw new BadRequestException('Invalid credentials');

    const userExists = await this.findUserByEmail(user.email);
    if (!userExists) return this.registerUser(user);

    console.log('User already exist returning JWT');
    return this.generateJwt({
      sub: userExists.id,
      email: userExists.email,
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
