import { Injectable, HttpException, ForbiddenException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';

import { Feed } from './feed.entity';
import { User } from 'user';
import { CreateFeedDto, UpdateFeedDto } from './interfaces';
import { FeedsRepository } from './feeds.repository';
import { DateTime } from '../constants';

@Injectable()
export class FeedsService {
  constructor(
    @InjectRepository(FeedsRepository)
    private readonly feedsRepository: FeedsRepository,
  ) { }

  async validateUser(id: number, user: User) {
    const feed = await this.get(id);
    if (!feed) {
      throw new NotFoundException('Feed not found');
    }
    if (user.id !== feed.user.id) {
      throw new UnauthorizedException('Feed doesn\'t belong to user');
    }
    return true;
  }

  async get(id: number) {
    return await this.feedsRepository.findOne(id, { relations: ['user'] });
  }

  async findByUser(user: User) {
    return this.feedsRepository.find({ user });
  }

  async findAll() {
    return await this.feedsRepository.find();
  }

  async create(user: User, data: CreateFeedDto) {
    try {
      const feed = new Feed();
      Object.assign(feed, data, {
        user,
        created: moment().format(DateTime.DateTimeDB),
        updated: moment().format(DateTime.DateTimeDB),
      });
      await feed.save();
      return feed;
    } catch (e) {
      throw new HttpException(e, 500);
    }
  }

  async update(id: number, data: UpdateFeedDto, user: User) {
    try {
      const feed = await this.feedsRepository.findOne(id);
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
      const feed = await this.feedsRepository.findOne(id);
      return await feed.remove();
    } catch (e) {
      throw new HttpException(e, 500);
    }
  }
}
