import { Module } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Goal } from './goal.entity';
import { GoalsController } from './goals.controller';
import { GoalsRepository } from './goals.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([GoalsRepository]),
  ],
  controllers: [GoalsController],
  exports: [GoalsService],
  providers: [GoalsService],
})
export class GoalsModule { }
