import { Repository, EntityRepository } from 'typeorm';
import { UserSkill } from './user-skill.entity';

@EntityRepository(UserSkill)
export class UserSkillsRepository extends Repository<UserSkill> { }