import { Repository, EntityRepository } from 'typeorm';
import { Goal } from './goal.entity';

@EntityRepository(Goal)
export class GoalsRepository extends Repository<Goal> { }