import { Repository, EntityRepository } from 'typeorm';
import { Journal } from './journal.entity';

@EntityRepository(Journal)
export class JournalRepository extends Repository<Journal> { }