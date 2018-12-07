import { Controller, Get, Put, Body, HttpException } from '@nestjs/common';
import { UsersService } from './user.service';
import { CurrentUser } from './current-user.decorator';
import { User } from './user.entity';
import { UpdateUserDto } from './interfaces';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

@Controller('users')
@ApiUseTags('User')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Put('updateProfile')
  @ApiOperation({ title: 'Update Profile' })
  async updateProfile(@CurrentUser() user: User, @Body() data: UpdateUserDto) {
    try {
      return await this.usersService.update(user, data);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
