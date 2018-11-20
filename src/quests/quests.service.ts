import { Injectable, HttpException, ForbiddenException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quest } from './quest.entity';
import { User } from 'user';
import { CreateQuestDto, UpdateQuestDto } from './interfaces';
import { QuestsRepository } from './quests.repository';

@Injectable()
export class QuestsService {
  constructor(
    @InjectRepository(QuestsRepository)
    private readonly questsRepository: QuestsRepository,
  ) { }

  async validateUser(id: number, user: User) {
    const quest = await this.get(id);
    if (!quest) {
      throw new NotFoundException('Quest not found');
    }
    if (user.id !== quest.user.id) {
      throw new UnauthorizedException('Quest doesn\'t belong to user');
    }
    return true;
  }

  async get(id: number) {
    return await this.questsRepository.findOne(id, { relations: ['user', 'goals'] });
  }

  async findByUser(user: User) {
    return this.questsRepository.find({ user });
  }

  async findAll() {
    return await this.questsRepository.find({ relations: ['user', 'goals'] });
  }

  async create(user: User, data: CreateQuestDto) {
    try {
      const quest = new Quest();
      Object.assign(quest, data);
      quest.user = user;
      await quest.save();
      return quest;
    } catch (e) {
      throw new HttpException(e, 500);
    }
  }

  async update(id: number, data: UpdateQuestDto, user: User) {
    try {
      const quest = await this.questsRepository.findOne(id);
      Object.assign(quest, data);
      await quest.save();
      return quest;
    } catch (e) {
      throw new HttpException(e, 500);
    }
  }

  async delete(id: number) {
    try {
      const quest = await this.questsRepository.findOne(id);
      return await quest.remove();
    } catch (e) {
      throw new HttpException(e, 500);
    }
  }
}
