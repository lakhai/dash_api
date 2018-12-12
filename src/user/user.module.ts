import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { UsersService } from './user.service';
import { UsersRepository } from './users.repository';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
   ],
  exports: [UsersService],
  providers: [
    UsersService,
    UserResolver,
  ],
})
export class UserModule { }