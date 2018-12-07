import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Body,
  UseGuards,
  Param,
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'user/current-user.decorator';
import { User } from 'user';
import { CreateSkillDto, UpdateSkillDto } from './interfaces';
import { createLevels, getCurrentLevel } from 'helpers/levelCalculation';

@Controller('Skills')
@ApiUseTags('Skills')
export class SkillsController {
  constructor(
    private readonly skillsService: SkillsService,
  ) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get All Skills' })
  async getAll(@CurrentUser() user: User): Promise<any> {
    return await this.skillsService.findByUser(user);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get Skill' })
  async getSingle(@CurrentUser() user: User, @Param('id') id: number) {
    const skill = await this.skillsService.get(id);
    const userSkill = await this.skillsService.getUserSkill({ user, skill });
    const levels = createLevels(skill);
    const currentLevel = getCurrentLevel(userSkill, levels);
    return { skill, currentLevel };
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Create Skill' })
  async create(@CurrentUser() user, @Body() data: CreateSkillDto) {
    return await this.skillsService.create(user, data);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Update Feed' })
  async update(@CurrentUser() user: User, @Param('id') id: number, @Body() data: UpdateSkillDto) {
    return await this.skillsService.update(id, data, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Delete Feed' })
  async delete(@CurrentUser() user: User, @Param('id') id: number) {
    return await this.skillsService.delete(id);
  }

  @Get('Current')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get current skills for user' })
  async getCurrentForUser(user: User) {
    return await this.skillsService.getCurrentSkills(user);
  }
}
