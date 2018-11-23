import { Injectable, HttpException, ForbiddenException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';

import { Journal } from './journal.entity';
import { User } from 'user';
import { CreateJournalDto, UpdateJournalDto } from './interfaces';
import { JournalRepository } from './journal.repository';
import { DateTime } from '../constants';

@Injectable()
export class JournalService {
  constructor(
    @InjectRepository(JournalRepository)
    private readonly journalRepository: JournalRepository,
  ) { }

  async validateUser(id: number, user: User) {
    const journal = await this.get(id);
    if (!journal) {
      throw new NotFoundException('Journal entry not found');
    }
    if (user.id !== journal.user.id) {
      throw new UnauthorizedException('Journal entry doesn\'t belong to user');
    }
    return true;
  }

  async get(id: number) {
    return await this.journalRepository.findOne(id, { relations: ['user'] });
  }

  async findByUser(user: User) {
    return this.journalRepository.find({ user });
  }

  async findAll() {
    return await this.journalRepository.find();
  }

  async create(user: User, data: CreateJournalDto) {
    try {
      const entry = new Journal();
      Object.assign(entry, data, {
        user,
        created: moment().format(DateTime.DateTimeDB),
        updated: moment().format(DateTime.DateTimeDB),
      });
      await entry.save();
      return entry;
    } catch (e) {
      throw new HttpException(e, 500);
    }
  }

  async update(id: number, data: UpdateJournalDto, user: User) {
    try {
      const entry = await this.journalRepository.findOne(id);
      Object.assign(entry, data, {
        updated: moment().format(DateTime.DateTimeDB),
      });
      await entry.save();
      return entry;
    } catch (e) {
      throw new HttpException(e, 500);
    }
  }

  async delete(id: number) {
    try {
      const entry = await this.journalRepository.findOne(id);
      return await entry.remove();
    } catch (e) {
      throw new HttpException(e, 500);
    }
  }
}
