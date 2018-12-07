import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsController } from './skills.controller';
import { SkillsRepository } from './skills.repository';
import { UserSkillsRepository } from './user-skills.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([SkillsRepository, UserSkillsRepository]),
  ],
  controllers: [SkillsController],
  exports: [SkillsService],
  providers: [SkillsService],
})
export class SkillsModule { }
