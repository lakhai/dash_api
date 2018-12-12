import { Module } from '@nestjs/common';
import { QuestsService } from './quests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestsController } from './quests.controller';
import { QuestsRepository } from './quests.repository';
import { QuestResolver } from './quests.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestsRepository]),
  ],
  controllers: [QuestsController],
  exports: [QuestsService],
  providers: [
  QuestsService,
  QuestResolver,
  ],
})
export class QuestsModule { }
