import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config';
import { AuthModule } from './auth';
import { GoalsModule } from 'goals/goals.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule,
    AuthModule,
    GoalsModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule { }
