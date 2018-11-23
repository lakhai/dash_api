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
import { QuestsService } from './quests.service';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'user/current-user.decorator';
import { User } from 'user';
import { CreateQuestDto, UpdateQuestDto } from './interfaces';

@Controller('quests')
@ApiUseTags('Quests')
export class QuestsController {
  constructor(
    private readonly questsService: QuestsService,
  ) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get All Quests' })
  async getAll(@CurrentUser() user: User): Promise<any> {
    return await this.questsService.findByUser(user);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Create Quest' })
  async create(@CurrentUser() user, @Body() data: CreateQuestDto) {
    return await this.questsService.create(user, data);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Update Quest' })
  async update(@CurrentUser() user: User, @Param('id') id: number, @Body() data: UpdateQuestDto) {
    if (await this.questsService.validateUser(id, user)) {
      return await this.questsService.update(id, data, user);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Delete Quest' })
  async delete(@CurrentUser() user: User, @Param('id') id: number) {
    if (await this.questsService.validateUser(id, user)) {
      return await this.questsService.delete(id);
    }
  }
}
