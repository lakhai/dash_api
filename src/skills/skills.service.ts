import { Injectable, HttpException, ForbiddenException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';

import { Skill } from './skill.entity';
import { User } from 'user';
import { CreateSkillDto, UpdateSkillDto } from './interfaces';
import { SkillsRepository } from './skills.repository';
import { DateTime } from '../constants';
import { UserSkill } from 'skills/user-skill.entity';
import { UserSkillsRepository } from './user-skills.repository';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(SkillsRepository)
    private readonly skillsRepository: SkillsRepository,
    @InjectRepository(UserSkillsRepository)
    private readonly userSkillsRepository: UserSkillsRepository,
  ) { }

  async get(id: number) {
    return await this.skillsRepository.findOne(id, {relations: ['user']});
  }

  async findByUser(user: User) {
    return this.skillsRepository.find({ relations: ['user'], where: {user} });
  }

  async findAll() {
    return await this.skillsRepository.find({relations: ['user']});
  }

  async getCurrentSkills(user: User) {
    return await this.userSkillsRepository.find({ relations: ['user', 'skill'], where: {user} });;
  }

  async getUserSkill(data: { user: User, skill: Skill }) {
    return await this.userSkillsRepository.findOne(data);
  }

  async validateUser(id: number, user: User) {
    const skill = await this.get(id);
    if (!skill) {
      throw new NotFoundException('Skill entry not found');
    }
    if (user.id !== skill.user.id) {
      throw new UnauthorizedException('Skill entry doesn\'t belong to user');
    }
    return true;
  }

  // Add UserSkill creation separately
  async create(user: User, data: CreateSkillDto) {
    try {
      const skill = new Skill();
      Object.assign(skill, data, {
        user,
        created: moment().format(DateTime.DateTimeDB),
        updated: moment().format(DateTime.DateTimeDB),
      });
      await skill.save();
      const userSkill = new UserSkill();
      Object.assign(userSkill, { user, skill });
      await userSkill.save();
      return userSkill;
    } catch (e) {
      throw new HttpException(e, 500);
    }
  }

  async update(id: number, data: UpdateSkillDto, user: User) {
    try {
      const feed = await this.skillsRepository.findOne(id, {relations: ['user']});
      Object.assign(feed, data, {
        updated: moment().format(DateTime.DateTimeDB),
      });
      await feed.save();
      return feed;
    } catch (e) {
      throw new HttpException(e, 500);
    }
  }

  async delete(id: number) {
    try {
      const feed = await this.skillsRepository.findOne(id, {relations: ['user']});
      return await feed.remove();
    } catch (e) {
      throw new HttpException(e, 500);
    }
  }
}
