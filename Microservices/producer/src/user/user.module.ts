import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RabbitService } from 'src/rabbit/rabbit.service';

@Module({
  providers: [UserService, RabbitService],
  controllers: [UserController],
})
export class UserModule {}
