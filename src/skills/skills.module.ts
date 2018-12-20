import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { UsersService} from './../user/user.service';
import { UsersRepository} from './../user/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsController } from './skills.controller';
import { SkillsRepository } from './skills.repository';
import { UserSkillsRepository } from './user-skills.repository';
import { SkillResolver } from './skills.resolver';


@Module({
  imports: [
    TypeOrmModule.forFeature([SkillsRepository, UserSkillsRepository, UsersRepository]),
  ],
  controllers: [SkillsController],
  exports: [SkillsService],
  providers: [
  SkillsService,
  UsersService,
  SkillResolver,
  ],
})
export class SkillsModule { }
