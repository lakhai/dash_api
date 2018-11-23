import { Controller, Get, Body, Post, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService, LoginPayload, RegisterPayload } from './';
import { UsersService, User } from './../user';
import { CurrentUser } from 'user/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiUseTags('authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) { }

  @Post('login')
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  async login(@Body() payload: LoginPayload): Promise<any> {
    const user = await this.authService.validateUser(payload);
    return await this.authService.createToken(user);
  }

  @Post('register')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async register(@Body() payload: RegisterPayload): Promise<any> {
    const user = await this.userService.create(payload);
    return await this.authService.createToken(user);
  }

  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get Current User Info' })
  async getUserInfo(@CurrentUser() user: User) {
    return user;
  }
}
