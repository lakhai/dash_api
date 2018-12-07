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
import { FeedsService } from './feeds.service';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'user/current-user.decorator';
import { User } from 'user';
import { CreateFeedDto, UpdateFeedDto } from './interfaces';
import { Feed } from './feed.entity';

@Controller('feeds')
@ApiUseTags('Feeds')
export class FeedsController {
  constructor(
    private readonly feedsService: FeedsService,
  ) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get All Feeds' })
  async getAll(@CurrentUser() user: User): Promise<any> {
    return await this.feedsService.findByUser(user);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get Feed' })
  async getEntry(@CurrentUser() user: User, @Param('id') id: number): Promise<Feed> {
    if (await this.feedsService.validateUser(id, user)) {
      return await this.feedsService.get(id);
    }
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Create Feed' })
  async create(@CurrentUser() user, @Body() data: CreateFeedDto) {
    return await this.feedsService.create(user, data);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Update Feed' })
  async update(@CurrentUser() user: User, @Param('id') id: number, @Body() data: UpdateFeedDto) {
    if (await this.feedsService.validateUser(id, user)) {
      return await this.feedsService.update(id, data, user);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Delete Feed' })
  async delete(@CurrentUser() user: User, @Param('id') id: number) {
    if (await this.feedsService.validateUser(id, user)) {
      return await this.feedsService.delete(id);
    }
  }
}
