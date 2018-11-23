import { Injectable, HttpException, ForbiddenException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Goal } from './goal.entity';
import { Repository } from 'typeorm';
import { CreateGoalDto } from './interfaces/CreateGoalDto';
import { User } from 'user';
import { UpdateGoalDto } from './interfaces/UpdateGoalDto';
import { GoalsRepository } from './goals.repository';
import { convertToNegative } from 'helpers/convertToNegative';
import { GoalStatuses } from './interfaces';

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(GoalsRepository)
    private readonly goalsRepository: GoalsRepository,
  ) { }

  async validateGoalUser(id: number, user: User) {
    const goal = await this.get(id);
    if (!goal) {
      throw new NotFoundException('Goal not found');
    }
    if (user.id !== goal.user.id) {
      throw new UnauthorizedException('Goal doesn\'t belong to user');
    }
    return true;
  }

  async get(id: number) {
    return await this.goalsRepository.findOne(id, { relations: ['user'] });
  }

  async findByUser(user: User) {
    return this.goalsRepository.find({ user });
  }

  async findAll() {
    return await this.goalsRepository.find();
  }

  async create(user: User, data: CreateGoalDto) {
    try {
      const goal = new Goal();
      Object.assign(goal, data);
      goal.user = user;
      await goal.save();
      return goal;
    } catch (e) {
      throw new HttpException(e, 500);
    }
  }

  async update(id: number, data: UpdateGoalDto, user: User) {
    try {
      const goal = await this.goalsRepository.findOne(id);
      Object.assign(goal, data);
      await goal.save();
      return goal;
    } catch (e) {
      throw new HttpException(e, 500);
    }
  }

  async delete(id: number) {
    try {
      const goal = await this.goalsRepository.findOne(id);
      return await goal.remove();
    } catch (e) {
      throw new HttpException(e, 500);
    }
  }

  async complete(id: number) {
    try {
      const goal = await this.get(id);
      goal.status = GoalStatuses.Completed;
      await goal.save();
      await goal.user.handleChangeXp(goal.awards);
      return goal.user;
    } catch (e) {
      throw new HttpException(e, 500);
    }
  }

  async fail(id: number) {
    try {
      const goal = await this.get(id);
      goal.status = GoalStatuses.Failed;
      await goal.save();
      await goal.user.handleChangeXp(convertToNegative(goal.awards / 2));
      return goal.user;
    } catch (e) {
      throw new HttpException(e, 500);
    }
  }
}
