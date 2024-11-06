import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  /**
   * Generates a JSON Web Token (JWT) with the provided payload.
   * @param payload - An object containing the claims to be encoded in the JWT.
   * @returns The generated JWT.
   */
  generateJwt(payload) {
    return this.jwtService.sign(payload);
  }

  /**
   * Handles user sign-in logic. If the user does not exist, it registers a new user and returns a JWT. If the user already exists, it generates a JWT for the existing user.
   * @param user - An object containing the user's email.
   * @returns A JSON Web Token (JWT) containing the user's information.
   */
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

  /**
   * Registers a new user and generates a JSON Web Token (JWT) for the user.
   * @param user - An object containing the user's information, such as email, first name, last name, picture, and role.
   * @returns A JSON Web Token (JWT) containing the user's information.
   */
  async registerUser(user) {
    try {
      console.log('Creating new User: ', user);
      const createdUser = await this.userService.createUser(user);
      const newUser = await this.findUserById(createdUser.id);

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

  /**
   * Finds a user by their email address.
   * @param email - The email address of the user to find.
   * @returns The user object if found, or `null` if not found.
   */
  async findUserByEmail(email: string) {
    const users = await this.userService.getAllUser();
    const user = users.find((user) => user.email === email);
    if (!user) return null;
    return user;
  }

  /**
   * Finds a user by their unique identifier.
   * @param id - The unique identifier of the user to find.
   * @returns The user object if found, or `null` if not found.
   */
  async findUserById(id: number) {
    const user = await this.userService.getUserById(id);
    if (!user) return null;
    return user;
  }
}
