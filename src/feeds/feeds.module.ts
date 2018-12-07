import { Module } from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedsController } from './feeds.controller';
import { FeedsRepository } from './feeds.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([FeedsRepository]),
  ],
  controllers: [FeedsController],
  exports: [FeedsService],
  providers: [FeedsService],
})
export class FeedsModule { }
