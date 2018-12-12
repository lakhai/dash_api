import { Module } from '@nestjs/common';
import { JournalService } from './journal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalController } from './journal.controller';
import { JournalRepository } from './journal.repository';
import { JournalResolver } from './journal.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([JournalRepository]),
  ],
  controllers: [JournalController],
  exports: [JournalService],
  providers: [
  JournalService,
  JournalResolver,
  ],
})
export class JournalModule { }
