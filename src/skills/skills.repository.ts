import { Repository, EntityRepository } from 'typeorm';
import { Skill } from './skill.entity';

@EntityRepository(Skill)
export class SkillsRepository extends Repository<Skill> { }