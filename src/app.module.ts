import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config';
import { AuthModule } from './auth';
import { GoalsModule } from 'goals/goals.module';
import { QuestsModule } from 'quests/quests.module';
import { JournalModule } from 'journal/journal.module';
import { FeedsModule } from 'feeds/feeds.module';
import { UsersController } from './user/users.controller';
import { SkillsModule } from 'skills/skills.module';
import { GraphQLModule } from '@nestjs/graphql'

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ headers: req.headers }),
    }),
    TypeOrmModule.forRoot(),
    ConfigModule,
    AuthModule,
    GoalsModule,
    QuestsModule,
    JournalModule,
    FeedsModule,
    SkillsModule,
  ],
  controllers: [
    AppController,
    UsersController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule { }
