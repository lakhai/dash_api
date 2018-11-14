import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Req,
  Body,
  HttpStatus,
  UseGuards,
  HttpException,
  Param,
  ForbiddenException,
} from '@nestjs/common';
import { includes } from 'lodash';
import { GoalsService } from './goals.service';
import { Goal } from './goal.entity';
import { ApiOperation } from '@nestjs/swagger';
import { CreateGoalDto } from './interfaces/CreateGoalDto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'user/current-user.decorator';
import { User } from 'user';
import { UpdateGoalDto } from './interfaces/UpdateGoalDto';

@Controller('goals')
export class GoalsController {
  constructor(
    private readonly goalsService: GoalsService,
  ) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get All Goals' })
  async getAll(@CurrentUser() user: User): Promise<any> {
    return await this.goalsService.findByUser(user);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Create Goal' })
  async create(@CurrentUser() user, @Body() data: CreateGoalDto) {
    return await this.goalsService.create(user, data);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Update Goal' })
  async update(@CurrentUser() user: User, @Param('id') id: number, @Body() data: UpdateGoalDto) {
    const goal: Goal = await this.goalsService.get(id);
    if (await this.goalsService.validateGoalUser(id, user)) {
      return await this.goalsService.update(id, data, user);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Delete Goal' })
  async delete(@CurrentUser() user: User, @Param('id') id: number) {
    if (await this.goalsService.validateGoalUser(id, user)) {
      return await this.goalsService.delete(id);
    }
  }

  @Get(':id/complete')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Complete Goal' })
  async complete(@CurrentUser() user: User, @Param('id') id: number) {
    if (await this.goalsService.validateGoalUser(id, user)) {
      return await this.goalsService.complete(id);
    }
  }

  @Get(':id/fail')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Fail Goal' })
  async fail(@CurrentUser() user: User, @Param('id') id: number) {
    if (await this.goalsService.validateGoalUser(id, user)) {
      return await this.goalsService.fail(id);
    }
  }
}
