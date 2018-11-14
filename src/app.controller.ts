import { Get, Controller, UseGuards, Req, HttpException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from './app.service';
import { CurrentUser } from 'user/current-user.decorator';

@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
}
