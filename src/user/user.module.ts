import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { UsersService } from './user.service';
import { QuestsService } from './../quests/quests.service';
import { UsersRepository } from './users.repository';
import { QuestsRepository } from './../quests/quests.repository';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository, QuestsRepository]),
   ],
  exports: [UsersService],
  providers: [
    UsersService,
    QuestsService,
    UserResolver,
  ],
})
export class UserModule { }