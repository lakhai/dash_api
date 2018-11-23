import { Module } from '@nestjs/common';
import { JournalService } from './journal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalController } from './journal.controller';
import { JournalRepository } from './journal.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([JournalRepository]),
  ],
  controllers: [JournalController],
  exports: [JournalService],
  providers: [JournalService],
})
export class JournalModule { }
