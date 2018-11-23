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
import { JournalService } from './journal.service';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'user/current-user.decorator';
import { User } from 'user';
import { CreateJournalDto, UpdateJournalDto } from './interfaces';
import { Journal } from './journal.entity';

@Controller('journal')
@ApiUseTags('Journal')
export class JournalController {
  constructor(
    private readonly journalService: JournalService,
  ) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get All Journal Entries' })
  async getAll(@CurrentUser() user: User): Promise<any> {
    return await this.journalService.findByUser(user);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get Entry' })
  async getEntry(@CurrentUser() user: User, @Param('id') id: number): Promise<Journal> {
    if (await this.journalService.validateUser(id, user)) {
      return await this.journalService.get(id);
    }
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Create Journal Entry' })
  async create(@CurrentUser() user, @Body() data: CreateJournalDto) {
    return await this.journalService.create(user, data);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Update Journal Entry' })
  async update(@CurrentUser() user: User, @Param('id') id: number, @Body() data: UpdateJournalDto) {
    if (await this.journalService.validateUser(id, user)) {
      return await this.journalService.update(id, data, user);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Delete Journal Entry' })
  async delete(@CurrentUser() user: User, @Param('id') id: number) {
    if (await this.journalService.validateUser(id, user)) {
      return await this.journalService.delete(id);
    }
  }
}
